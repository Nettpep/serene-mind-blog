'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Locale } from '@/i18n-config'

interface PaginationProps {
  currentPage: number
  totalPages: number
  locale: Locale
  basePath: string
  dictionary: {
    pagination: {
      previous: string
      next: string
      page: string
      of: string
    }
  }
}

export default function Pagination({
  currentPage,
  totalPages,
  locale,
  basePath,
  dictionary,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    const separator = basePath.includes('?') ? '&' : '?'
    if (page === 1) {
      // Remove page param if going to page 1
      return basePath.replace(/[?&]page=\d+/, '').replace(/\?$/, '')
    }
    // Add or update page param
    if (basePath.includes('page=')) {
      return basePath.replace(/page=\d+/, `page=${page}`)
    }
    return `${basePath}${separator}page=${page}`
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // In the middle
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <nav className="flex flex-col items-center gap-6 mt-16 pt-8 border-t border-stone-200">
      {/* Page Info */}
      <div className="text-sm text-zen-muted">
        {dictionary.pagination.page} {currentPage} {dictionary.pagination.of} {totalPages}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 text-zen-text hover:bg-zen-accent hover:text-white hover:border-zen-accent transition-colors"
          >
            <ChevronLeft size={18} />
            <span>{dictionary.pagination.previous}</span>
          </Link>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 text-zen-muted cursor-not-allowed opacity-50">
            <ChevronLeft size={18} />
            <span>{dictionary.pagination.previous}</span>
          </div>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-zen-muted">
                  ...
                </span>
              )
            }

            const pageNum = page as number
            const isActive = pageNum === currentPage

            return (
              <Link
                key={pageNum}
                href={getPageUrl(pageNum)}
                className={`min-w-[40px] px-3 py-2 rounded-lg text-center transition-colors ${
                  isActive
                    ? 'bg-zen-accent text-white font-medium'
                    : 'border border-stone-300 text-zen-text hover:bg-zen-accent/10 hover:border-zen-accent'
                }`}
              >
                {pageNum}
              </Link>
            )
          })}
        </div>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 text-zen-text hover:bg-zen-accent hover:text-white hover:border-zen-accent transition-colors"
          >
            <span>{dictionary.pagination.next}</span>
            <ChevronRight size={18} />
          </Link>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 text-zen-muted cursor-not-allowed opacity-50">
            <span>{dictionary.pagination.next}</span>
            <ChevronRight size={18} />
          </div>
        )}
      </div>
    </nav>
  )
}
