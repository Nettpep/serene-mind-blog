'use client'

import React from 'react'
import { Heart, Coffee } from 'lucide-react'
import type { Locale } from '@/i18n-config'

interface DonateButtonProps {
  locale: Locale
  dictionary: {
    donate: {
      title: string
      description: string
      koFi: string
      paypal: string
      buyMeACoffee: string
    }
  }
}

const DonateButton: React.FC<DonateButtonProps> = ({ locale, dictionary }) => {
  // ใช้ environment variables สำหรับ donation links
  // ตั้งค่าใน .env.local:
  // NEXT_PUBLIC_KO_FI_URL=https://ko-fi.com/yourusername
  // NEXT_PUBLIC_PAYPAL_URL=https://paypal.me/yourusername
  // NEXT_PUBLIC_BUY_ME_A_COFFEE_URL=https://buymeacoffee.com/yourusername
  
  const koFiUrl = process.env.NEXT_PUBLIC_KO_FI_URL
  const paypalUrl = process.env.NEXT_PUBLIC_PAYPAL_URL
  const buyMeACoffeeUrl = process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE_URL

  // แสดง component เสมอ แต่ถ้าไม่มี URL จะแสดงข้อความแนะนำ
  const hasAnyUrl = koFiUrl || paypalUrl || buyMeACoffeeUrl

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-zen-text/70 text-sm font-light">
        <Heart size={14} className="text-zen-accent" />
        <span>{dictionary.donate.title}</span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {koFiUrl ? (
          <a
            href={koFiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md"
          >
            <Coffee size={14} />
            {dictionary.donate.koFi}
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-200 text-stone-400 rounded-lg text-sm font-medium cursor-not-allowed opacity-50">
            <Coffee size={14} />
            {dictionary.donate.koFi}
          </div>
        )}
        {paypalUrl ? (
          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0070BA] hover:bg-[#0070BA]/90 text-white rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md"
          >
            <Heart size={14} />
            {dictionary.donate.paypal}
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-200 text-stone-400 rounded-lg text-sm font-medium cursor-not-allowed opacity-50">
            <Heart size={14} />
            {dictionary.donate.paypal}
          </div>
        )}
        {buyMeACoffeeUrl ? (
          <a
            href={buyMeACoffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-zen-text rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md"
          >
            <Coffee size={14} />
            {dictionary.donate.buyMeACoffee}
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-200 text-stone-400 rounded-lg text-sm font-medium cursor-not-allowed opacity-50">
            <Coffee size={14} />
            {dictionary.donate.buyMeACoffee}
          </div>
        )}
      </div>
      {!hasAnyUrl && (
        <p className="text-zen-text/40 text-xs text-center max-w-xs font-light italic">
          {locale === 'th' 
            ? 'ตั้งค่า donation links ใน .env.local เพื่อเปิดใช้งาน'
            : 'Configure donation links in .env.local to enable'
          }
        </p>
      )}
      {dictionary.donate.description && (
        <p className="text-zen-text/50 text-xs text-center max-w-xs font-light">
          {dictionary.donate.description}
        </p>
      )}
    </div>
  )
}

export default DonateButton
