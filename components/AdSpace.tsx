'use client'

import React from 'react'
import { ExternalLink } from 'lucide-react'

interface AdSpaceProps {
  variant?: 'sidebar' | 'banner' | 'in-content' | 'footer'
  title?: string
  className?: string
}

const AdSpace: React.FC<AdSpaceProps> = ({ 
  variant = 'sidebar',
  title,
  className = ''
}) => {
  // ตัวอย่าง: ใช้ environment variable หรือ config เพื่อแสดง/ซ่อนโฆษณา
  // สำหรับ demo: แสดงโฆษณาเสมอ (เปลี่ยนเป็น false เพื่อซ่อน)
  const showAds = true // หรือ process.env.NEXT_PUBLIC_ENABLE_ADS === 'true'
  
  if (!showAds) {
    return null // ซ่อนโฆษณาถ้ายังไม่เปิดใช้งาน
  }

  const baseStyles = {
    sidebar: 'bg-white rounded-xl p-6 shadow-sm border border-stone-200',
    banner: 'bg-gradient-to-r from-zen-accent/10 to-zen-accent/5 rounded-xl p-6 border border-zen-accent/20',
    'in-content': 'bg-zen-bg rounded-xl p-8 border border-stone-200 my-12',
    footer: 'bg-white rounded-xl p-6 shadow-sm border border-stone-200'
  }

  return (
    <div className={`${baseStyles[variant]} ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs uppercase tracking-widest text-zen-muted font-bold">
            {title}
          </h3>
          <span className="text-[10px] text-zen-muted/60">โฆษณา</span>
        </div>
      )}
      
      {/* Placeholder สำหรับโฆษณา */}
      <div className="space-y-4">
        {/* ตัวอย่าง: Affiliate Link */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block group"
        >
          <div className="bg-zen-bg rounded-lg p-4 border border-stone-200 hover:border-zen-accent transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-stone-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-zen-text text-sm mb-1 group-hover:text-zen-accent transition-colors line-clamp-2">
                  หนังสือแนะนำ: ศาสตร์แห่งความสงบ
                </h4>
                <p className="text-xs text-zen-muted line-clamp-2 mb-2">
                  ค้นพบความสงบภายในผ่านการฝึกสมาธิและสติ
                </p>
                <div className="flex items-center gap-1 text-xs text-zen-accent">
                  <span>ดูรายละเอียด</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* ตัวอย่าง: Product/Service Link */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block group"
        >
          <div className="bg-zen-bg rounded-lg p-4 border border-stone-200 hover:border-zen-accent transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-stone-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-2xl">🧘</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-zen-text text-sm mb-1 group-hover:text-zen-accent transition-colors line-clamp-2">
                  คอร์สออนไลน์: ฝึกสมาธิเบื้องต้น
                </h4>
                <p className="text-xs text-zen-muted line-clamp-2 mb-2">
                  เริ่มต้นการฝึกสมาธิด้วยคอร์สออนไลน์ที่ออกแบบมาเป็นพิเศษ
                </p>
                <div className="flex items-center gap-1 text-xs text-zen-accent">
                  <span>ดูรายละเอียด</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* ข้อความแจ้งเตือน */}
      <p className="text-[10px] text-zen-muted/60 mt-4 text-center">
        * ลิงก์พันธมิตร
      </p>
    </div>
  )
}

export default AdSpace
