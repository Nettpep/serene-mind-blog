'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { useState } from 'react'
import type { Locale } from '@/i18n-config'

const languages = {
  th: { name: 'ไทย', flag: '🇹🇭' },
  en: { name: 'English', flag: '🇬🇧' },
}

interface LanguageSwitcherProps {
  currentLang: Locale
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLang: Locale) => {
    if (newLang === currentLang) {
      setIsOpen(false)
      return
    }

    // Replace the locale in the pathname
    const segments = pathname.split('/')
    segments[1] = newLang
    const newPath = segments.join('/')
    
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-zen-text hover:text-zen-accent transition-colors rounded-lg hover:bg-stone-50"
        aria-label="Change language"
      >
        <Globe size={18} />
        <span>{languages[currentLang].flag}</span>
        <span className="font-medium">{languages[currentLang].name}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 overflow-hidden z-20">
            {Object.entries(languages).map(([lang, { name, flag }]) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang as Locale)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  lang === currentLang
                    ? 'bg-zen-accent text-white'
                    : 'text-zen-text hover:bg-stone-50'
                }`}
              >
                <span className="text-xl">{flag}</span>
                <span className="font-medium">{name}</span>
                {lang === currentLang && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
