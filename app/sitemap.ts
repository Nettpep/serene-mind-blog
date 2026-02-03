import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/markdown'
import { i18n } from '@/i18n-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://serenemind.blog'

  // Static pages for each locale
  const staticPages: MetadataRoute.Sitemap = []
  
  for (const locale of i18n.locales) {
    staticPages.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/${locale}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/${locale}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/${locale}/terms-of-service`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      }
    )
  }

  // Dynamic blog posts for each locale
  const postPages: MetadataRoute.Sitemap = []
  
  for (const locale of i18n.locales) {
    const slugs = getAllPostSlugs(locale)
    
    for (const slug of slugs) {
      postPages.push({
        url: `${baseUrl}/${locale}/post/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }
  }

  return [...staticPages, ...postPages]
}
