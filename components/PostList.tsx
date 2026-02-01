'use client'

import { useState } from 'react'
import BlogCard from '@/components/BlogCard'
import CategoryFilter from '@/components/CategoryFilter'
import { getPostsByCategory } from '@/lib/categories'
import { BlogPost } from '@/types'

interface PostListProps {
    initialPosts: BlogPost[]
}

export default function PostList({ initialPosts }: PostListProps) {
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
                        <BlogCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-zen-muted py-12">
                        ไม่พบบทความในหมวดหมู่นี้
                    </div>
                )}
            </div>
        </>
    )
}
