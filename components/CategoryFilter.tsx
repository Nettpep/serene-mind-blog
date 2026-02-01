'use client'

import React, { useState } from 'react';
import { getAllCategories } from '@/lib/categories';
import { BlogPost } from '@/types';

interface CategoryFilterProps {
    posts: BlogPost[];
    onFilterChange: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ posts, onFilterChange }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const categories = getAllCategories(posts);

    const handleCategoryClick = (category: string | null) => {
        setActiveCategory(category);
        onFilterChange(category);
    };

    return (
        <div className="flex flex-wrap gap-3 justify-center mb-16">
            <button
                onClick={() => handleCategoryClick(null)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm ${activeCategory === null
                        ? 'bg-zen-accent text-white shadow-md'
                        : 'bg-white text-zen-text border border-stone-200 hover:border-zen-accent hover:text-zen-accent'
                    }`}
            >
                ทั้งหมด
            </button>

            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm ${activeCategory === category
                            ? 'bg-zen-accent text-white shadow-md'
                            : 'bg-white text-zen-text border border-stone-200 hover:border-zen-accent hover:text-zen-accent'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
