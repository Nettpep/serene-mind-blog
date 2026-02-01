import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/markdown'
import type { Locale } from '@/i18n-config'
import { i18n } from '@/i18n-config'

export async function GET(request: Request) {
  try {
    // Get locale from query parameter or default to 'th'
    const { searchParams } = new URL(request.url)
    const localeParam = searchParams.get('locale')
    const locale: Locale = 
      localeParam && i18n.locales.includes(localeParam as Locale)
        ? (localeParam as Locale)
        : i18n.defaultLocale

    const posts = await getAllPosts(locale)
    // Return only searchable fields (no HTML content)
    const searchablePosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      imageUrl: post.imageUrl,
      category: post.category,
      tags: post.tags,
    }))
    return NextResponse.json(searchablePosts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json([], { status: 500 })
  }
}
