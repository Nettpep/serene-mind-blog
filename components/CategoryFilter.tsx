'use client'

import React from 'react';
import Link from 'next/link';
import { getAllCategories } from '@/lib/categories';
import { BlogPost } from '@/types';
import type { Locale } from '@/i18n-config';

interface CategoryFilterProps {
  posts: BlogPost[];
  locale: Locale;
  currentCategory: string | null;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  posts,
  locale,
  currentCategory,
}) => {
  const categories = getAllCategories(posts);
  const allLabel = locale === 'th' ? 'ทั้งหมด' : 'All';

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-16">
      <Link
        href={`/${locale}`}
        className={`px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
          currentCategory === null
            ? 'bg-zen-accent text-white shadow-md'
            : 'bg-white text-zen-text border border-stone-200 hover:border-zen-accent hover:text-zen-accent'
        }`}
      >
        {allLabel}
      </Link>

      {categories.map((category) => (
        <Link
          key={category}
          href={`/${locale}?category=${encodeURIComponent(category)}`}
          className={`px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
            currentCategory === category
              ? 'bg-zen-accent text-white shadow-md'
              : 'bg-white text-zen-text border border-stone-200 hover:border-zen-accent hover:text-zen-accent'
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
