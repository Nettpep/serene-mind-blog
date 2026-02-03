'use client'

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { TocItem } from '@/types';

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, title = 'Table of Contents' }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
    setActiveId(id);
    setIsOpen(false); // Close mobile menu after clicking
  };

  const getIndentClass = (level: number) => {
    switch (level) {
      case 2: return 'pl-0';
      case 3: return 'pl-4';
      case 4: return 'pl-8';
      case 5: return 'pl-12';
      case 6: return 'pl-16';
      default: return 'pl-0';
    }
  };

  const TocContent = () => (
    <>
      <h4 className="text-gray-400 uppercase text-xs tracking-[0.2em] mb-6 font-bold">{title}</h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className={getIndentClass(item.level)}>
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-all duration-300 font-light ${activeId === item.id
                  ? 'text-zen-accent translate-x-1 font-normal'
                  : 'text-zen-muted hover:text-zen-text'
                }`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.id);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile TOC Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-zen-accent text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Toggle table of contents"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile TOC Drawer */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <nav
            className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-zen-bg p-6 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <TocContent />
          </nav>
        </div>
      )}

      {/* Desktop TOC */}
      <nav className="hidden lg:block sticky top-32 self-start ml-8 p-6 border-l border-neutral-800 max-w-[250px]">
        <TocContent />
      </nav>
    </>
  );
};

export default TableOfContents;