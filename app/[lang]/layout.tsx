import type { Metadata } from 'next'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/get-dictionary'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    lang: Locale
  }>
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
    themeColor: '#FDFBF7',
  }
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  
  return (
    <>
      <Header currentLang={lang} />
      {children}
      <Footer locale={lang} dictionary={dictionary} />
    </>
  )
}
