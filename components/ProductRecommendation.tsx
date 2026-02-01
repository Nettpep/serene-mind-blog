'use client'

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Star } from 'lucide-react';

interface ProductRecommendationProps {
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    imageUrl: string;
    affiliateLink: string;
    category?: string;
    inStock?: boolean;
}

const ProductRecommendation: React.FC<ProductRecommendationProps> = ({
    name,
    description,
    price,
    originalPrice,
    rating = 0,
    imageUrl,
    affiliateLink,
    category,
    inStock = true
}) => {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-stone-50">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                            -{discount}%
                        </span>
                    </div>
                )}

                {/* Stock Status */}
                {!inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="px-4 py-2 bg-white text-zen-text font-bold rounded-lg">
                            สินค้าหมด
                        </span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Category */}
                {category && (
                    <span className="text-xs text-zen-accent uppercase tracking-wider font-bold">
                        {category}
                    </span>
                )}

                {/* Product Name */}
                <h3 className="font-serif text-base text-zen-text mt-2 mb-2 line-clamp-2 group-hover:text-zen-accent transition-colors">
                    {name}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-xs text-zen-muted line-clamp-2 mb-3">
                        {description}
                    </p>
                )}

                {/* Rating */}
                {rating > 0 && (
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}
                            />
                        ))}
                        <span className="text-xs text-zen-muted ml-1">({rating}.0)</span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-zen-text">
                        ฿{price.toLocaleString()}
                    </span>
                    {originalPrice && (
                        <span className="text-sm text-zen-muted line-through">
                            ฿{originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* CTA */}
                <a
                    href={affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium ${inStock
                        ? 'bg-zen-accent hover:bg-zen-accent/90 text-white shadow-sm hover:shadow-md'
                        : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                        }`}
                    onClick={(e) => !inStock && e.preventDefault()}
                >
                    {inStock ? 'ดูสินค้า' : 'สินค้าหมด'}
                    {inStock && <ExternalLink size={14} />}
                </a>

                {/* Affiliate Disclaimer */}
                <p className="text-[10px] text-zen-muted text-center mt-2">
                    *ลิงก์พันธมิตร เราได้รับค่าคอมมิชชั่น
                </p>
            </div>
        </div>
    );
};

export default ProductRecommendation;
