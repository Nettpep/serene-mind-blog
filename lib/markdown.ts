import fs from 'fs'
import path from 'path'
import { unstable_cache } from 'next/cache'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { BlogPost } from '@/types'
import type { Locale } from '@/i18n-config'

const postsDirectory = path.join(process.cwd(), 'content/posts')

/** Cache revalidate time (seconds). Reduces disk + CPU load under high traffic. */
const CACHE_REVALIDATE = 60

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

    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug) // Auto-generate IDs (will be overridden if custom ID exists)
      .use(rehypeStringify)
      .process(cleanedContent)

    let contentHtml = processedContent.toString()

    // Replace auto-generated IDs with custom IDs if they exist
    headingIdMap.forEach((customId, headingText) => {
      // Find heading with this text and replace its ID
      const escapedText = headingText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`(<h([2-6])\\s+id=")[^"]+("[^>]*>${escapedText}</h\\2>)`, 'i')
      contentHtml = contentHtml.replace(regex, `$1${customId}$3`)
    })

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
