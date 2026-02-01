'use client'

import { useState } from 'react'
import BlogCard from '@/components/BlogCard'
import CategoryFilter from '@/components/CategoryFilter'
import { getPostsByCategory } from '@/lib/categories'
import { BlogPost } from '@/types'
import type { Locale } from '@/i18n-config'

interface PostListProps {
    initialPosts: BlogPost[]
    locale: Locale
    dictionary: {
        post: {
            read: string;
            readMore: string;
        };
        search?: {
            noPosts?: string;
        };
    };
}

export default function PostList({ initialPosts, locale, dictionary }: PostListProps) {
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts)

    const handleFilterChange = (category: string | null) => {
        if (category === null) {
            setFilteredPosts(initialPosts)
        } else {
            setFilteredPosts(getPostsByCategory(initialPosts, category))
        }
    }

    return (
        <>
            {/* Category Filter */}
            <div className="mb-16">
                <CategoryFilter posts={initialPosts} onFilterChange={handleFilterChange} />
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} locale={locale} dictionary={dictionary} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-zen-muted py-12">
                        {locale === 'th' ? 'ไม่พบบทความ' : 'No posts found'}
                    </div>
                )}
            </div>
        </>
    )
}
