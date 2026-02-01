'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import SearchBar from './SearchBar'
import { BlogPost } from '@/types'
import type { Locale } from '@/i18n-config'

export default function SearchBarWrapper() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Extract locale from pathname (e.g., /th/... or /en/...)
    const segments = pathname.split('/').filter(Boolean)
    const locale: Locale = (segments[0] === 'en' ? 'en' : 'th')
    
    // Fetch posts for search with locale
    fetch(`/api/posts?locale=${locale}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [pathname])

  if (loading) {
    return null // Don't show search until posts are loaded
  }

  return <SearchBar posts={posts} />
}
