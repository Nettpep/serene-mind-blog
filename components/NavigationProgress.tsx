'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

/**
 * Shows instant loading bar when navigating between pages
 * Gives immediate visual feedback for better perceived performance
 */
export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 100,
      minimum: 0.1,
      easing: 'ease',
      speed: 300,
    })

    // Cleanup on unmount
    return () => {
      NProgress.remove()
    }
  }, [])

  useEffect(() => {
    // Route change complete - finish progress bar
    NProgress.done()
  }, [pathname, searchParams])

  return null
}
