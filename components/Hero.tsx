'use client'

import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
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
          Mindfulness & Causality
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-zen-text leading-[1.1] mb-8 animate-fade-in-up delay-100">
          เมื่อสิ่งนี้มี... <br/>
          <span className="italic text-zen-accent font-light">
            สิ่งนี้ย่อมมี
          </span>
        </h1>
        
        <p className="font-sans text-lg md:text-xl text-zen-text/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
          ค้นพบความสงบในจิตใจผ่านกฎแห่งธรรมชาติ เรียนรู้ที่จะอยู่กับปัจจุบัน
          และเข้าใจที่มาของทุกความรู้สึกอย่างถ่องแท้
        </p>

        <div className="animate-fade-in-up delay-300">
          <button 
            onClick={() => document.getElementById('latest-posts')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-col items-center gap-3 text-zen-muted hover:text-zen-accent transition-colors duration-500 cursor-pointer mx-auto"
          >
             <span className="text-sm tracking-widest uppercase">เริ่มอ่านบทความ</span>
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