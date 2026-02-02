import { NextResponse } from 'next/server'
import { getAllPostsCached } from '@/lib/markdown'
import type { Locale } from '@/i18n-config'
import { i18n } from '@/i18n-config'

/** Allow CDN/browser to cache for 60s; serve stale up to 5min while revalidating. */
const CACHE_CONTROL = 'public, s-maxage=60, stale-while-revalidate=300'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const localeParam = searchParams.get('locale')
    const locale: Locale =
      localeParam && i18n.locales.includes(localeParam as Locale)
        ? (localeParam as Locale)
        : i18n.defaultLocale

    const posts = await getAllPostsCached(locale)
    const searchablePosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      imageUrl: post.imageUrl,
      category: post.category,
      tags: post.tags,
    }))

    return NextResponse.json(searchablePosts, {
      headers: { 'Cache-Control': CACHE_CONTROL },
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json([], { status: 500 })
  }
}
