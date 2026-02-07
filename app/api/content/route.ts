import { NextResponse } from 'next/server'
import { getAllPostsCached } from '@/lib/markdown'
import type { Locale } from '@/i18n-config'
import { i18n } from '@/i18n-config'

/** Allow CDN/browser to cache for 60s; serve stale up to 5min while revalidating. */
const CACHE_CONTROL = 'public, s-maxage=60, stale-while-revalidate=300'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const localeParam = searchParams.get('locale')
        const locale: Locale =
            localeParam && i18n.locales.includes(localeParam as Locale)
                ? (localeParam as Locale)
                : i18n.defaultLocale

        const posts = await getAllPostsCached(locale)

        // Format for AI readability with blog metadata
        const response = {
            blog: {
                name: 'Serene Mind Blog',
                description: locale === 'th'
                    ? 'บล็อกสองภาษาเกี่ยวกับสติ ธรรมะ และปรัชญา'
                    : 'A bilingual blog on mindfulness, dharma, and philosophy',
                language: locale,
                url: SITE_URL,
            },
            posts: posts.map((post) => ({
                id: post.id,
                title: post.title,
                excerpt: post.excerpt,
                url: `${SITE_URL}/${locale}/post/${post.id}`,
                publishedDate: post.date,
                readTime: post.readTime,
                imageUrl: post.imageUrl,
                category: post.category,
                tags: post.tags,
            })),
            format: 'ai-readable',
            version: '1.0',
        }

        return NextResponse.json(response, {
            headers: {
                'Cache-Control': CACHE_CONTROL,
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
    } catch (error) {
        console.error('Error fetching content:', error)
        return NextResponse.json(
            { error: 'Failed to fetch content' },
            { status: 500 }
        )
    }
}
