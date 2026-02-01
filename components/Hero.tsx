'use client'

import React from 'react';
import { ArrowDown } from 'lucide-react';
import type { Locale } from '@/i18n-config';

interface HeroProps {
  locale: Locale;
  dictionary: {
    hero: {
      title: string;
      subtitle: string;
      tagline: string;
      description: string;
      cta: string;
    };
  };
}

const Hero: React.FC<HeroProps> = ({ locale, dictionary }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Soft Overlay */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" 
            alt="Zen Nature" 
            className="w-full h-full object-cover opacity-90"
         />
         {/* Gradient Overlay for text readability and warmth */}
         <div className="absolute inset-0 bg-gradient-to-b from-zen-bg/80 via-zen-bg/60 to-zen-bg"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl mt-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 text-zen-accent tracking-widest text-xs uppercase font-medium mb-6 shadow-sm animate-fade-in-up">
          {dictionary.hero.tagline}
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-zen-text leading-[1.3] mb-8 animate-fade-in-up delay-100">
          {locale === 'th' ? (
            <>
              <span className="block mb-2">เมื่อสิ่งนี้มี...</span>
              <span className="block italic text-zen-accent font-light leading-[1.4]">
                สิ่งนี้ย่อมมี
              </span>
            </>
          ) : (
            <>
              <span className="block mb-2">When this exists...</span>
              <span className="block italic text-zen-accent font-light leading-[1.4]">
                This will exist
              </span>
            </>
          )}
        </h1>
        
        <p className="font-sans text-lg md:text-xl text-zen-text/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
          {dictionary.hero.description}
        </p>

        <div className="animate-fade-in-up delay-300">
          <button 
            onClick={() => document.getElementById('latest-posts')?.scrollIntoView({ behavior: 'smooth' })} 
            className="group flex flex-col items-center gap-3 text-zen-muted hover:text-zen-accent transition-colors duration-500 cursor-pointer mx-auto"
          >
             <span className="text-sm tracking-widest uppercase">{dictionary.hero.cta}</span>
             <div className="w-10 h-10 rounded-full border border-zen-muted/30 group-hover:border-zen-accent flex items-center justify-center transition-all">
               <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
             </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;