'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/i18n-config'
import { i18n } from '@/i18n-config'

export default function LangScript() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    
    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean)
    const locale: Locale = (segments[0] === 'en' ? 'en' : 'th')
    
    // Update html lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [pathname])

  return null
}
