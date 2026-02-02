'use client'

import { ExternalLink } from 'lucide-react';

interface ProductButtonProps {
  affiliateLink: string;
  inStock: boolean;
  viewProductText: string;
  outOfStockText: string;
}

export default function ProductButton({ 
  affiliateLink, 
  inStock, 
  viewProductText,
  outOfStockText 
}: ProductButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!inStock) {
      e.preventDefault();
    }
  };

  return (
    <a
      href={affiliateLink}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium ${
        inStock
          ? 'bg-zen-accent hover:bg-zen-accent/90 text-white shadow-sm hover:shadow-md'
          : 'bg-stone-200 text-stone-500 cursor-not-allowed'
      }`}
      onClick={handleClick}
    >
      {inStock ? viewProductText : outOfStockText}
      {inStock && <ExternalLink size={14} />}
    </a>
  );
}
