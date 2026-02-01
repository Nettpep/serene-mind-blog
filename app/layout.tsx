import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Serene Mind | จิตวิทยาและสมาธิ',
  description: 'พื้นที่แห่งความสงบและการเรียนรู้เรื่องจิตวิทยา สมาธิ และกฎอิทัปปัจจยตา',
  themeColor: '#FDFBF7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-zen-bg text-zen-text font-sans selection:bg-zen-accent/20 selection:text-zen-accent">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
