import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/markdown'
import type { Locale } from '@/i18n-config'
import { i18n } from '@/i18n-config'

const CACHE_CONTROL = 'public, s-maxage=60, stale-while-revalidate=300'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * Strip HTML tags and convert to plain text for AI readability
 */
function htmlToPlainText(html: string): string {
    return html
        // Remove script and style tags with their content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        // Remove HTML tags
        .replace(/<[^>]+>/g, '')
        // Decode HTML entities
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        // Clean up whitespace
        .replace(/\s+/g, ' ')
        .trim()
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const { searchParams } = new URL(request.url)
        const localeParam = searchParams.get('locale')
        const locale: Locale =
            localeParam && i18n.locales.includes(localeParam as Locale)
                ? (localeParam as Locale)
                : i18n.defaultLocale

        const post = await getPostBySlug(id, locale)

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            )
        }

        // Convert HTML content to plain text for AI readability
        const plainTextContent = htmlToPlainText(post.content)

        const response = {
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            fullContent: plainTextContent,
            publishedDate: post.date,
            readTime: post.readTime,
            imageUrl: post.imageUrl,
            category: post.category,
            tags: post.tags,
            url: `${SITE_URL}/${locale}/post/${post.id}`,
            language: locale,
            series: post.series,
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
