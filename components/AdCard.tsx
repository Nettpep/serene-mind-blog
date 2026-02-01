'use client'

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Tag } from 'lucide-react';

interface AdCardProps {
    title: string;
    description: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
    type?: 'affiliate' | 'sponsored' | 'product';
    badge?: string;
}

const AdCard: React.FC<AdCardProps> = ({
    title,
    description,
    imageUrl,
    ctaText,
    ctaLink,
    type = 'affiliate',
    badge
}) => {
    const typeLabels = {
        affiliate: 'แนะนำ',
        sponsored: 'โฆษณา',
        product: 'สินค้า'
    };

    return (
        <div className="group relative bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Type Label */}
            <div className="absolute top-3 right-3 z-10">
                <span className="px-3 py-1 bg-zen-accent/90 text-white text-[10px] uppercase tracking-wider font-bold rounded-full backdrop-blur-sm">
                    {typeLabels[type]}
                </span>
            </div>

            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-stone-100">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Optional Badge */}
                {badge && (
                    <div className="absolute bottom-3 left-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-zen-accent">
                            <Tag size={12} />
                            {badge}
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-serif text-lg text-zen-text mb-2 line-clamp-2 group-hover:text-zen-accent transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-zen-muted line-clamp-3 mb-4 leading-relaxed">
                    {description}
                </p>

                {/* CTA Button */}
                <a
                    href={ctaLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-zen-accent hover:bg-zen-accent/90 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                >
                    {ctaText}
                    <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};

export default AdCard;
