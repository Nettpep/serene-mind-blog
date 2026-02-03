'use client'

import React from 'react'
import { Heart, Coffee, Sparkles } from 'lucide-react'
import type { Locale } from '@/i18n-config'

interface DonateButtonProps {
  locale: Locale
  dictionary: {
    donate: {
      title: string
      subtitle?: string
      description: string
      whySupport?: string
      reasons?: string[]
      koFi: string
      paypal: string
      buyMeACoffee: string
      thankYou?: string
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
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <Sparkles size={20} className="text-zen-accent" />
          <h3 className="font-serif text-2xl text-zen-text font-bold">
            {dictionary.donate.title}
          </h3>
        </div>
        {dictionary.donate.subtitle && (
          <p className="text-zen-text/70 text-sm font-light mb-4">
            {dictionary.donate.subtitle}
          </p>
        )}
        {dictionary.donate.description && (
          <p className="text-zen-text/60 text-sm leading-relaxed max-w-md mx-auto mb-6">
            {dictionary.donate.description}
          </p>
        )}
      </div>

      {/* Donation Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {koFiUrl ? (
          <a
            href={koFiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg hover:scale-105"
          >
            <Coffee size={16} />
            <span>{dictionary.donate.koFi}</span>
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-stone-200 text-stone-400 rounded-xl text-sm font-medium cursor-not-allowed opacity-50">
            <Coffee size={16} />
            <span>{dictionary.donate.koFi}</span>
          </div>
        )}
        
        {paypalUrl ? (
          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0070BA] hover:bg-[#0070BA]/90 text-white rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg hover:scale-105"
          >
            <Heart size={16} />
            <span>{dictionary.donate.paypal}</span>
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-stone-200 text-stone-400 rounded-xl text-sm font-medium cursor-not-allowed opacity-50">
            <Heart size={16} />
            <span>{dictionary.donate.paypal}</span>
          </div>
        )}
        
        {buyMeACoffeeUrl ? (
          <a
            href={buyMeACoffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-zen-text rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg hover:scale-105"
          >
            <Coffee size={16} />
            <span>{dictionary.donate.buyMeACoffee}</span>
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-stone-200 text-stone-400 rounded-xl text-sm font-medium cursor-not-allowed opacity-50">
            <Coffee size={16} />
            <span>{dictionary.donate.buyMeACoffee}</span>
          </div>
        )}
      </div>

      {/* Thank You Message */}
      {hasAnyUrl && dictionary.donate.thankYou && (
        <p className="text-center text-zen-text/50 text-xs font-light italic mt-4">
          {dictionary.donate.thankYou}
        </p>
      )}

    </div>
  )
}

export default DonateButton
