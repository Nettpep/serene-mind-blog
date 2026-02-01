'use client'

import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import { BlogPost } from '@/types'

export default function SearchBarWrapper() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch posts for search
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return null // Don't show search until posts are loaded
  }

  return <SearchBar posts={posts} />
}
