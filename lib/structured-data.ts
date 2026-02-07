import type { BlogPost } from '@/types'
import type { Locale } from '@/i18n-config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * Generate JSON-LD structured data for an Article
 * Reference: https://schema.org/Article
 */
export function generateArticleSchema(
    post: BlogPost,
    locale: Locale
): Record<string, any> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.imageUrl,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Organization',
            name: 'Serene Mind Editorial Team',
            url: SITE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Serene Mind',
            url: SITE_URL,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`, // Update with your actual logo path
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/${locale}/post/${post.id}`,
        },
        articleSection: post.category,
        keywords: post.tags.join(', '),
        inLanguage: locale === 'th' ? 'th-TH' : 'en-US',
    }
}

/**
 * Generate JSON-LD structured data for WebSite
 */
export function generateWebSiteSchema(locale: Locale): Record<string, any> {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Serene Mind',
        description:
            locale === 'th'
                ? 'บล็อกสองภาษาเกี่ยวกับสติ ธรรมะ และปรัชญา'
                : 'A bilingual blog on mindfulness, dharma, and philosophy',
        url: SITE_URL,
        inLanguage: locale === 'th' ? 'th-TH' : 'en-US',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/${locale}?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(
    post: BlogPost,
    locale: Locale
): Record<string, any> {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: locale === 'th' ? 'หน้าแรก' : 'Home',
                item: `${SITE_URL}/${locale}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: post.category,
                item: `${SITE_URL}/${locale}?category=${encodeURIComponent(post.category)}`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `${SITE_URL}/${locale}/post/${post.id}`,
            },
        ],
    }
}
