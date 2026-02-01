import { BlogPost } from '@/types'

/**
 * Get all unique categories from posts
 */
export function getAllCategories(posts: BlogPost[]): string[] {
    const categories = posts.map(post => post.category)
    return Array.from(new Set(categories)).sort()
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(posts: BlogPost[]): string[] {
    const allTags = posts.flatMap(post => post.tags)
    return Array.from(new Set(allTags)).sort()
}

/**
 * Filter posts by category
 */
export function getPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
    return posts.filter(post => post.category === category)
}

/**
 * Filter posts by tag
 */
export function getPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
    return posts.filter(post => post.tags.includes(tag))
}

/**
 * Convert Thai text to URL-safe slug
 * For Thai text, we'll use a simple index-based system
 */
export function createSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\u0E00-\u0E7Fa-z0-9-]/g, '') // Keep Thai, English, numbers, and hyphens
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

/**
 * Get category counts
 */
export function getCategoryCounts(posts: BlogPost[]): Record<string, number> {
    const counts: Record<string, number> = {}
    posts.forEach(post => {
        counts[post.category] = (counts[post.category] || 0) + 1
    })
    return counts
}

/**
 * Get tag counts
 */
export function getTagCounts(posts: BlogPost[]): Record<string, number> {
    const counts: Record<string, number> = {}
    posts.forEach(post => {
        post.tags.forEach(tag => {
            counts[tag] = (counts[tag] || 0) + 1
        })
    })
    return counts
}
