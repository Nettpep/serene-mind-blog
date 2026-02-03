'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import NProgress from 'nprogress'
import { ComponentProps, MouseEvent } from 'react'

/**
 * Enhanced Link component with instant loading feedback
 * Shows progress bar immediately on click for better UX
 */
export default function NavigationLink({ 
  href, 
  onClick, 
  children,
  ...props 
}: ComponentProps<typeof Link>) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call original onClick if provided
    onClick?.(e)

    // If default prevented, don't navigate
    if (e.defaultPrevented) return

    // Don't intercept external links or new tab opens
    const target = e.currentTarget.getAttribute('target')
    if (target === '_blank' || e.metaKey || e.ctrlKey) return

    // Don't intercept anchor links on same page
    const url = href.toString()
    if (url.startsWith('#')) return

    // Start progress bar immediately
    NProgress.start()

    // Let Next.js Link handle the navigation
    // Progress will complete in NavigationProgress component
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
