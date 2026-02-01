import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types';
import { ArrowRight } from 'lucide-react';
import { formatThaiDate } from '@/lib/date';
import type { Locale } from '@/i18n-config';

interface BlogCardProps {
  post: BlogPost;
  locale: Locale;
  dictionary: {
    post: {
      read: string;
      readMore: string;
    };
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post, locale, dictionary }) => {
  return (
    <Link href={`/${locale}/post/${post.id}`} className="group block h-full">
      <article className="h-full bg-zen-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-zen-accent/5 transition-all duration-500 ease-out flex flex-col hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <Image 
            src={post.imageUrl} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute top-4 left-4">
             <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-zen-text text-xs font-medium rounded-full shadow-sm">
               {post.category}
             </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center gap-3 text-xs text-zen-muted mb-4 font-medium uppercase tracking-wider">
            <span>{formatThaiDate(post.date)}</span>
            <span className="w-1 h-1 bg-zen-muted/50 rounded-full"></span>
            <span>{post.readTime} {dictionary.post.read}</span>
          </div>

          <h3 className="font-serif text-2xl text-zen-text mb-4 group-hover:text-zen-accent transition-colors leading-tight">
            {post.title}
          </h3>
          
          <p className="text-zen-text/60 text-sm leading-7 line-clamp-3 mb-6 flex-grow font-light">
            {post.excerpt}
          </p>

          <div className="pt-4 flex items-center text-zen-accent font-medium text-sm gap-2 group/btn">
            {dictionary.post.readMore}
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;