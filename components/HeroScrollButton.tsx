'use client'

import { ArrowDown } from 'lucide-react';

interface HeroScrollButtonProps {
  text: string;
}

export default function HeroScrollButton({ text }: HeroScrollButtonProps) {
  const handleClick = () => {
    document.getElementById('latest-posts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button 
      onClick={handleClick}
      className="group flex flex-col items-center gap-3 text-zen-muted hover:text-zen-accent transition-colors duration-500 cursor-pointer mx-auto"
    >
      <span className="text-sm tracking-widest uppercase">{text}</span>
      <div className="w-10 h-10 rounded-full border border-zen-muted/30 group-hover:border-zen-accent flex items-center justify-center transition-all">
        <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
      </div>
    </button>
  );
}
