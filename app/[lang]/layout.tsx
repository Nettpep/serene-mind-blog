import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import '../globals.css'
import '../nprogress.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SmoothScrollAnchor from '@/components/SmoothScrollAnchor'
import NavigationProgress from '@/components/NavigationProgress'
import type { Locale } from '@/i18n-config'
import { i18n } from '@/i18n-config'
import { getDictionary } from '@/lib/get-dictionary'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    lang: Locale
  }>
}

// Tell Next.js about all possible lang values for proper type inference
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }))
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return {
    title: lang === 'th'
      ? 'Serene Mind | จิตวิทยาและสมาธิ'
      : 'Serene Mind | Psychology and Meditation',
    description: lang === 'th'
      ? 'พื้นที่แห่งความสงบและการเรียนรู้เรื่องจิตวิทยา สมาธิ และกฎอิทัปปัจจยตา'
      : 'A space for peace and learning about psychology, meditation, and the law of Idappaccayatā',
  }
}

export const viewport: Viewport = {
  themeColor: '#FDFBF7',
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      <SmoothScrollAnchor />
      <Header currentLang={lang} />
      {children}
      <Footer locale={lang} dictionary={dictionary} />
    </>
  )
}
