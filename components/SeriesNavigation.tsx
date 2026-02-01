'use client'

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { BlogPost } from '@/types';

interface SeriesNavigationProps {
    currentPost: BlogPost;
    allPosts: BlogPost[];
}

const SeriesNavigation: React.FC<SeriesNavigationProps> = ({ currentPost, allPosts }) => {
    if (!currentPost.series) return null;

    // Find all posts in this series
    const seriesPosts = allPosts
        .filter(post => post.series?.id === currentPost.series?.id)
        .sort((a, b) => (a.series?.order || 0) - (b.series?.order || 0));

    const currentIndex = seriesPosts.findIndex(post => post.id === currentPost.id);
    const previousPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

    const { series } = currentPost;

    return (
        <div className="my-16 p-8 bg-gradient-to-br from-zen-accent/5 to-zen-accent/10 border border-zen-accent/20 rounded-2xl">
            {/* Series Header */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-zen-accent/20">
                <BookOpen className="text-zen-accent mt-1 flex-shrink-0" size={24} />
                <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-zen-accent font-bold mb-2">
                        Series
                    </p>
                    <h3 className="text-xl font-serif text-zen-text mb-2">
                        {series.title}
                    </h3>
                    <p className="text-sm text-zen-muted">
                        ตอนที่ {series.order} จาก {series.totalParts} ตอน
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="hidden md:block w-32">
                    <div className="bg-zen-accent/10 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-zen-accent h-full rounded-full transition-all duration-500"
                            style={{ width: `${(series.order / series.totalParts) * 100}%` }}
                        />
                    </div>
                    <p className="text-xs text-zen-muted text-right mt-1">
                        {Math.round((series.order / series.totalParts) * 100)}%
                    </p>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Previous Button */}
                {previousPost ? (
                    <Link
                        href={`/post/${previousPost.id}`}
                        className="group flex items-center gap-4 p-4 bg-white hover:bg-zen-accent/5 border border-stone-200 hover:border-zen-accent/40 rounded-xl transition-all duration-300"
                    >
                        <ChevronLeft className="text-zen-accent flex-shrink-0 group-hover:-translate-x-1 transition-transform" size={20} />
                        <div className="flex-1 text-left">
                            <p className="text-xs text-zen-muted mb-1">ตอนก่อนหน้า</p>
                            <p className="text-sm text-zen-text font-medium line-clamp-2 group-hover:text-zen-accent transition-colors">
                                {previousPost.title}
                            </p>
                        </div>
                    </Link>
                ) : (
                    <div className="p-4 bg-gray-50 border border-stone-200 rounded-xl opacity-40">
                        <p className="text-xs text-zen-muted text-center">ไม่มีตอนก่อนหน้า</p>
                    </div>
                )}

                {/* Next Button */}
                {nextPost ? (
                    <Link
                        href={`/post/${nextPost.id}`}
                        className="group flex items-center gap-4 p-4 bg-white hover:bg-zen-accent/5 border border-stone-200 hover:border-zen-accent/40 rounded-xl transition-all duration-300"
                    >
                        <div className="flex-1 text-right">
                            <p className="text-xs text-zen-muted mb-1">ตอนถัดไป</p>
                            <p className="text-sm text-zen-text font-medium line-clamp-2 group-hover:text-zen-accent transition-colors">
                                {nextPost.title}
                            </p>
                        </div>
                        <ChevronRight className="text-zen-accent flex-shrink-0 group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>
                ) : (
                    <div className="p-4 bg-gray-50 border border-stone-200 rounded-xl opacity-40">
                        <p className="text-xs text-zen-muted text-center">จบ Series แล้ว 🎉</p>
                    </div>
                )}
            </div>

            {/* All Episodes (Optional - Collapsible) */}
            {seriesPosts.length > 2 && (
                <details className="mt-6 pt-6 border-t border-zen-accent/20">
                    <summary className="cursor-pointer text-sm text-zen-accent hover:text-zen-accent/80 font-medium flex items-center gap-2 transition-colors">
                        <BookOpen size={16} />
                        ดูทุกตอนใน Series นี้ ({seriesPosts.length} ตอน)
                    </summary>
                    <ul className="mt-4 space-y-2">
                        {seriesPosts.map((post) => (
                            <li key={post.id}>
                                <Link
                                    href={`/post/${post.id}`}
                                    className={`block p-3 rounded-lg transition-all ${post.id === currentPost.id
                                            ? 'bg-zen-accent/10 border border-zen-accent/30 text-zen-accent font-medium'
                                            : 'bg-white hover:bg-zen-accent/5 border border-stone-200 hover:border-zen-accent/20 text-zen-text hover:text-zen-accent'
                                        }`}
                                >
                                    <span className="text-xs text-zen-muted mr-2">ตอนที่ {post.series?.order}</span>
                                    <span className="text-sm">{post.title}</span>
                                    {post.id === currentPost.id && (
                                        <span className="ml-2 text-xs text-zen-accent">(กำลังอ่านอยู่)</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </details>
            )}
        </div>
    );
};

export default SeriesNavigation;
