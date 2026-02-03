'use client'

import { useEffect } from 'react'

/**
 * Enables smooth scrolling for anchor links within the same page
 * without affecting page transitions
 */
export default function SmoothScrollAnchor() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (!anchor) return
      
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      
      const targetElement = document.querySelector(href)
      if (!targetElement) return
      
      e.preventDefault()
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      
      // Update URL without triggering navigation
      history.pushState(null, '', href)
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return null
}
