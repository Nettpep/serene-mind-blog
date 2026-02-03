'use client'

import React from 'react';
import NavigationLink from './NavigationLink';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/date';
import { useDictionary } from '@/lib/use-dictionary';

interface RelatedPostsProps {
    currentPost: BlogPost;
    allPosts: BlogPost[];
    maxPosts?: number;
}

/**
 * Calculate relevance score for related posts
 */
function calculateRelevance(post: BlogPost, currentPost: BlogPost): number {
    let score = 0;

    // Same category: +3 points
    if (post.category === currentPost.category) {
        score += 3;
    }

    // Matching tags: +1 point per tag
    const matchingTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    score += matchingTags.length;

    return score;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, allPosts, maxPosts = 3 }) => {
    const { dict, lang } = useDictionary();
    // Filter out current post and calculate relevance
    const relatedPosts = allPosts
        .filter(post => post.id !== currentPost.id)
        .map(post => ({
            post,
            score: calculateRelevance(post, currentPost)
        }))
        .filter(({ score }) => score > 0) // Only posts with some relation
        .sort((a, b) => b.score - a.score) // Highest score first
        .slice(0, maxPosts)
        .map(({ post }) => post);

    // If not enough related posts, fill with latest posts
    if (relatedPosts.length < maxPosts) {
        const additionalPosts = allPosts
            .filter(post =>
                post.id !== currentPost.id &&
                !relatedPosts.find(rp => rp.id === post.id)
            )
            .slice(0, maxPosts - relatedPosts.length);

        relatedPosts.push(...additionalPosts);
    }

    if (relatedPosts.length === 0) return null;
    if (!dict) return null;

    return (
        <div className="mt-20 pt-12 border-t border-stone-200">
            <h2 className="font-serif text-3xl text-zen-text mb-8">
                {dict.post.relatedPosts}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                    <NavigationLink
                        key={post.id}
                        href={`/${lang}/post/${post.id}`}
                        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100 hover:border-zen-accent"
                    >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                width={400}
                                height={200}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {/* Category */}
                            <span className="text-xs text-zen-accent uppercase tracking-wider font-bold">
                                {post.category}
                            </span>

                            {/* Title */}
                            <h3 className="font-serif text-lg text-zen-text mt-2 mb-2 line-clamp-2 group-hover:text-zen-accent transition-colors">
                                {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-sm text-zen-muted line-clamp-2 mb-3">
                                {post.excerpt}
                            </p>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-xs text-zen-text/60">
                                <Calendar size={14} />
                                <span>{formatDate(post.date, lang)}</span>
                            </div>
                        </div>
                    </NavigationLink>
                ))}
            </div>
        </div>
    );
};

export default RelatedPosts;
