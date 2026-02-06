import type { Metadata, Viewport } from 'next'
import './globals.css'
import { i18n } from '@/i18n-config'
import LangScript from '@/components/LangScript'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Serene Mind | จิตวิทยาและสมาธิ',
  description: 'พื้นที่แห่งความสงบและการเรียนรู้เรื่องจิตวิทยา สมาธิ และกฎอิทัปปัจจยตา',
}

export const viewport: Viewport = {
  themeColor: '#FDFBF7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={i18n.defaultLocale} suppressHydrationWarning>
      <body className="min-h-screen bg-zen-bg text-zen-text font-sans selection:bg-zen-accent/20 selection:text-zen-accent">
        <LangScript />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
