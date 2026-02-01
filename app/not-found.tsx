import Link from 'next/link'
import { i18n } from '@/i18n-config'

export default function NotFound() {
  const defaultLocale = i18n.defaultLocale
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-zen-bg">
      <div className="text-center">
        <h2 className="text-2xl text-zen-text mb-4 font-serif">ไม่พบบทความ</h2>
        <Link href={`/${defaultLocale}`} className="text-zen-accent hover:underline">
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  )
}
