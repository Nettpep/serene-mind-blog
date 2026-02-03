'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'
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

  // Safety check: ensure currentLang is valid
  const validLang: Locale = (currentLang && languages[currentLang as keyof typeof languages])
    ? currentLang
    : 'th'

  // Close dropdown automatically when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const switchLanguage = (newLang: Locale) => {
    if (newLang === validLang) {
      setIsOpen(false)
      return
    }

    // Replace the locale in the pathname
    const segments = (pathname || '').split('/').filter(Boolean)
    if (segments.length > 0 && (segments[0] === 'th' || segments[0] === 'en')) {
      segments[0] = newLang
    } else {
      segments.unshift(newLang)
    }
    const newPath = '/' + segments.join('/')

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
        <span>{languages[validLang].flag}</span>
        <span className="font-medium">{languages[validLang].name}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 overflow-hidden z-50">
            {Object.entries(languages).map(([lang, { name, flag }]) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang as Locale)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  lang === validLang
                    ? 'bg-zen-accent text-white'
                    : 'text-zen-text hover:bg-stone-50'
                }`}
              >
                <span className="text-xl">{flag}</span>
                <span className="font-medium">{name}</span>
                {lang === validLang && (
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
