'use client'

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import type { Locale } from '@/i18n-config';

const SearchBarWrapper = dynamic(() => import('./SearchBarWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-9 h-9 rounded-lg bg-stone-100 animate-pulse" aria-hidden />
  ),
});

const THROTTLE_MS = 100;

function throttle<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let last = 0;
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  }) as T;
}

interface HeaderProps {
  currentLang: Locale;
}

const Header: React.FC<HeaderProps> = ({ currentLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const pathname = usePathname();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateScrolled = throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, THROTTLE_MS);

    const handleScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => updateScrolled());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Extract lang from pathname with safety check
  const pathSegments = (pathname || '').split('/').filter(Boolean)
  const extractedLang = pathSegments[0] as Locale
  const lang: Locale = (extractedLang === 'th' || extractedLang === 'en') 
    ? extractedLang 
    : (currentLang || 'th')

  const navLinks = [
    { name: currentLang === 'th' ? 'หน้าแรก' : 'Home', path: `/${lang}` },
    { name: currentLang === 'th' ? 'บทความ' : 'Blog', path: `/${lang}` },
    { name: currentLang === 'th' ? 'เกี่ยวกับเรา' : 'About', path: `/${lang}/about` },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-zen-bg/90 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isScrolled ? 'bg-zen-accent text-white' : 'bg-white text-zen-accent shadow-md'}`}>
             <span className="font-serif font-bold text-xl leading-none pt-1">S</span>
          </div>
          <span className={`font-serif text-lg tracking-widest font-bold transition-colors ${isScrolled ? 'text-zen-text' : 'text-zen-text'}`}>
            SERENE MIND
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className="text-sm font-medium text-zen-text/70 hover:text-zen-accent transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-[1px] bg-gray-300"></div>

          {/* Search Bar */}
          <SearchBarWrapper />
          
          <div className="h-4 w-[1px] bg-gray-300"></div>

          {/* Language Switcher */}
          <LanguageSwitcher currentLang={lang} />

          <div className="h-4 w-[1px] bg-gray-300"></div>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-zen-accent/10 text-zen-text/70 hover:text-zen-accent transition-all text-xs font-medium"
            title="Ambient Sound"
          >
             {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
             <span className="hidden lg:inline">{isPlaying ? 'On' : 'Off'}</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-zen-text"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zen-bg border-b border-stone-200 animate-fade-in shadow-lg">
          <nav className="flex flex-col p-8 gap-6 items-center">
             {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className="text-xl font-serif text-zen-text hover:text-zen-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;