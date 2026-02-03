import fs from 'fs'
import path from 'path'
import { unstable_cache } from 'next/cache'
import matter from 'gray-matter'
import { remark } from 'remark'
import { BlogPost } from '@/types'
import type { Locale } from '@/i18n-config'

// Import plugins - using the standard remark-rehype pipeline for reliability
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'content/posts')

/** Cache revalidate time (seconds). Reduce disk + CPU load in production; avoid stale content in dev. */
const CACHE_REVALIDATE = process.env.NODE_ENV === 'production' ? 60 : 0

export function getAllPostSlugs(locale: Locale = 'th'): string[] {
  const localeDirectory = path.join(postsDirectory, locale)
  
  if (!fs.existsSync(localeDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(localeDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

async function getPostBySlugUncached(slug: string, locale: Locale = 'th'): Promise<BlogPost | null> {
  try {
    const localeDirectory = path.join(postsDirectory, locale)
    const fullPath = path.join(localeDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Extract custom IDs from headings and remove them from text
    const headingIdMap = new Map<string, string>()
    const cleanedContent = content.replace(/^(#{2,6})\s+(.+?)\s*\{#([^}]+)\}/gm, (match, hashes, text, id) => {
      const headingText = text.trim()
      headingIdMap.set(headingText, id)
      return `${hashes} ${headingText}`
    })

    // Process markdown to HTML using remark-rehype pipeline
    // This is the standard, reliable approach that works across all platforms
    let contentHtml = ''
    try {
      // Ensure plugins are functions (handle both ES modules and CommonJS)
      const gfm = typeof remarkGfm === 'function' ? remarkGfm : (remarkGfm as any).default || remarkGfm
      const rehype = typeof remarkRehype === 'function' ? remarkRehype : (remarkRehype as any).default || remarkRehype
      const slug = typeof rehypeSlug === 'function' ? rehypeSlug : (rehypeSlug as any).default || rehypeSlug
      const stringify = typeof rehypeStringify === 'function' ? rehypeStringify : (rehypeStringify as any).default || rehypeStringify

      const processedContent = await remark()
        .use(gfm)
        .use(rehype)
        .use(slug) // Auto-generate IDs for headings
        .use(stringify)
        .process(cleanedContent)

      contentHtml = processedContent.toString()
      
      // Replace auto-generated IDs with custom IDs if they exist
      headingIdMap.forEach((customId, headingText) => {
        // Find heading with this text and replace its ID
        const escapedText = headingText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`(<h([2-6])\\s+id=")[^"]+("[^>]*>${escapedText}</h\\2>)`, 'i')
        contentHtml = contentHtml.replace(regex, `$1${customId}$3`)
      })
      
      // Debug: log if content is empty
      if (!contentHtml || contentHtml.trim().length === 0) {
        console.warn(`Warning: Empty HTML content for post ${slug} (${locale}). Markdown length: ${cleanedContent.length}`)
      }
    } catch (processError) {
      console.error(`Error processing markdown for post ${slug}:`, processError)
      console.error('Error details:', processError instanceof Error ? processError.stack : processError)
      // Fallback: return raw markdown as HTML (basic escape)
      contentHtml = cleanedContent
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
    }


    return {
      id: data.id || slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: contentHtml,
      date: data.date || '',
      readTime: data.readTime || '',
      imageUrl: data.imageUrl || '',
      category: data.category || '',
      tags: data.tags || [],
      series: data.series ? {
        id: data.series.id || '',
        title: data.series.title || '',
        order: data.series.order || 1,
        totalParts: data.series.totalParts || 1,
      } : undefined,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/** Cached per (slug, locale). Revalidates every CACHE_REVALIDATE seconds for high-traffic scaling. */
export async function getPostBySlug(slug: string, locale: Locale = 'th'): Promise<BlogPost | null> {
  if (CACHE_REVALIDATE === 0) {
    return getPostBySlugUncached(slug, locale)
  }

  return unstable_cache(
    () => getPostBySlugUncached(slug, locale),
    ['post', slug, locale],
    { revalidate: CACHE_REVALIDATE, tags: ['posts', `post-${locale}-${slug}`] }
  )()
}

export async function getAllPosts(locale: Locale = 'th'): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs(locale)
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, locale))
  )

  // Filter out null posts and sort by date (newest first)
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
}

/** Cached list of posts per locale. Use for home page and API to reduce load under high traffic. */
export async function getAllPostsCached(locale: Locale = 'th'): Promise<BlogPost[]> {
  if (CACHE_REVALIDATE === 0) {
    const slugs = getAllPostSlugs(locale)
    const posts = await Promise.all(
      slugs.map((slug) => getPostBySlugUncached(slug, locale))
    )
    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA
      })
  }

  return unstable_cache(
    async () => {
      const slugs = getAllPostSlugs(locale)
      const posts = await Promise.all(
        slugs.map((slug) => getPostBySlugUncached(slug, locale))
      )
      return posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => {
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()
          return dateB - dateA
        })
    },
    ['all-posts', locale],
    { revalidate: CACHE_REVALIDATE, tags: ['posts', `posts-${locale}`] }
  )()
}
