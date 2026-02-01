import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="group block h-full">
      <article className="h-full bg-zen-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-zen-accent/5 transition-all duration-500 ease-out flex flex-col hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
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
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-zen-muted/50 rounded-full"></span>
            <span>{post.readTime} อ่าน</span>
          </div>

          <h3 className="font-serif text-2xl text-zen-text mb-4 group-hover:text-zen-accent transition-colors leading-tight">
            {post.title}
          </h3>
          
          <p className="text-zen-text/60 text-sm leading-7 line-clamp-3 mb-6 flex-grow font-light">
            {post.excerpt}
          </p>

          <div className="pt-4 flex items-center text-zen-accent font-medium text-sm gap-2 group/btn">
            อ่านต่อ 
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;