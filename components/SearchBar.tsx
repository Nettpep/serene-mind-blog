'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types'
import Fuse from 'fuse.js'
import { useDictionary } from '@/lib/use-dictionary'

interface SearchBarProps {
  posts: BlogPost[]
}

const SearchBar: React.FC<SearchBarProps> = ({ posts }) => {
  const { dict, lang } = useDictionary()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogPost[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Configure Fuse.js
  const fuse = React.useMemo(() => {
    return new Fuse(posts, {
      keys: ['title', 'excerpt', 'category', 'tags'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    })
  }, [posts])

  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = fuse.search(query)
      setResults(searchResults.map(result => result.item))
    } else {
      setResults([])
    }
  }, [query, fuse])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setQuery('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      inputRef.current?.focus()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }

  if (!dict) return null

  return (
    <div ref={searchRef} className="relative">
      {/* Search Button/Input */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 hover:bg-white border border-stone-200 text-zen-text/70 hover:text-zen-text transition-all text-sm font-medium shadow-sm"
        aria-label="Search"
      >
        <Search size={16} />
        <span className="hidden md:inline">{dict.search.placeholder}</span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-zen-text/50 bg-stone-100 border border-stone-200 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Box */}
          <div className="relative w-full max-w-2xl bg-zen-surface rounded-2xl shadow-2xl border border-stone-200">
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-stone-200">
              <Search size={20} className="text-zen-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={dict.search.placeholder}
                className="flex-1 bg-transparent outline-none text-zen-text placeholder:text-zen-muted"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-stone-100 rounded transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} className="text-zen-muted" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length === 0 ? (
                <div className="p-8 text-center text-zen-muted">
                  <Search size={32} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm">{dict.search.startTyping}</p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-zen-muted">
                  <p className="text-sm">{dict.search.noPosts.replace('{query}', query)}</p>
                </div>
              ) : (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs text-zen-muted font-medium">
                    {dict.search.found} {results.length} {dict.search.posts}
                  </div>
                  {results.map((post) => (
                    <Link
                      key={post.id}
                      href={`/${lang}/post/${post.id}`}
                      onClick={() => {
                        setIsOpen(false)
                        setQuery('')
                      }}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-stone-50 transition-colors group"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-base text-zen-text group-hover:text-zen-accent transition-colors line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-zen-muted line-clamp-2 mt-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-zen-muted">
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-stone-200 flex items-center justify-between text-xs text-zen-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-stone-100 rounded">↑↓</kbd>
                  <span>เลือก</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-stone-100 rounded">↵</kbd>
                  <span>เปิด</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-stone-100 rounded">Esc</kbd>
                  <span>ปิด</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
