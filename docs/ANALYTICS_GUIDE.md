# วิธีดูว่ามีคนเข้ามาอ่านเว็บไซต์เรา

## ตัวเลือกหลัก

| ตัวเลือก | ดูได้จากที่ไหน | ฟรี/เสียเงิน | หมายเหตุ |
|----------|-----------------|-------------|----------|
| **Google Analytics (GA4)** | dashboard.google.com/analytics | ฟรี | ใช้กันมากที่สุด ดูจำนวนคนเข้า, หน้า, ประเทศ, อุปกรณ์ |
| **Vercel Analytics** | vercel.com → โปรเจกต์ → Analytics | ฟรี (โควต้า) | ใช้ได้เมื่อ deploy บน Vercel |
| **Plausible** | plausible.io | มีฟรี trial / เสียเงิน | โฟกัสความเป็นส่วนตัว, ใช้ง่าย |
| **Umami** | self-host หรือ umami.is | ฟรี (self-host) | โอเพนซอร์ส, โฟกัสความเป็นส่วนตัว |

---

## 1. Google Analytics (GA4)

**ดูได้จาก:** https://analytics.google.com

### ขั้นตอนคร่าวๆ

1. สร้างบัญชี GA4 ที่ [Google Analytics](https://analytics.google.com)
2. สร้าง Property → ได้ **Measurement ID** (รูปแบบ `G-XXXXXXXXXX`)
3. เพิ่ม script ในเว็บ Next.js:

**วิธีที่ 1 – ใช้ layout (แนะนำ)**

สร้างไฟล์ `components/GoogleAnalytics.tsx`:

```tsx
'use client'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
```

ใน `app/[lang]/layout.tsx` เพิ่ม:

```tsx
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default async function RootLayout(...) {
  return (
    <>
      <GoogleAnalytics />
      <Header ... />
      {children}
      <Footer ... />
    </>
  )
}
```

4. ตั้งค่าในโปรเจกต์ (เช่น Vercel / .env.local):

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

5. Deploy แล้วเข้าไปดูรายงานที่ **Reports** ใน GA4 (จำนวนผู้ใช้, หน้าเพจ, ประเทศ ฯลฯ)

---

## 2. Vercel Analytics (เมื่อ deploy บน Vercel)

**ดูได้จาก:** Vercel Dashboard → เลือกโปรเจกต์ → แท็บ **Analytics**

### ขั้นตอน

1. ติดตั้ง package:

```bash
npm i @vercel/analytics
```

2. ใน `app/layout.tsx` หรือ `app/[lang]/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

3. Deploy บน Vercel → ไปที่โปรเจกต์ → **Analytics** จะเห็นจำนวนผู้เยี่ยมชม (page views, unique visitors ฯลฯ)

---

## 3. Plausible

**ดูได้จาก:** https://plausible.io (หลังสมัครและเพิ่มเว็บแล้ว)

- โฟกัสความเป็นส่วนตัว (ไม่ใช้คุกกี้)
- หลังสมัครจะได้ snippet ให้ใส่ใน `<head>` หรือใช้กับ Next.js ผ่าน Script ใน layout (คล้าย GA)
- ดูจำนวนผู้เข้า, หน้าเพจ, แหล่งที่มา ฯลฯ จาก dashboard ของ Plausible

---

## 4. Umami (self-host หรือ Cloud)

**ดูได้จาก:** dashboard ของ Umami ที่คุณ deploy ไว้ หรือ umami.is ถ้าใช้ cloud

- โอเพนซอร์ส
- ติดตั้งบนเซิร์ฟเวอร์หรือใช้ Umami Cloud แล้วเพิ่ม script ใน layout (มีเอกสารใน [umami.is](https://umami.is))
- ดูจำนวนผู้เข้า, หน้า, อ้างอิง ฯลฯ จาก dashboard

---

## สรุปสั้นๆ

- **อยากใช้ฟรีและดูได้ครบ (จำนวนคนเข้า, หน้า, ประเทศ):** ใช้ **Google Analytics (GA4)** + ตั้ง `NEXT_PUBLIC_GA_MEASUREMENT_ID` แล้วเพิ่ม component ตามด้านบน
- **ถ้า deploy บน Vercel อยู่แล้ว:** ใช้ **Vercel Analytics** จะเห็นจำนวนคนเข้า/หน้าได้จาก Vercel Dashboard
- **อยากเน้นความเป็นส่วนตัว:** พิจารณา **Plausible** หรือ **Umami**

หลังตั้งค่าแล้ว รอข้อมูลสะสมสัก 1–2 วัน แล้วเข้าไปดูจาก “ที่ไหน” ตามตารางด้านบน (GA, Vercel, Plausible หรือ Umami) ก็จะเห็นว่ามีคนเข้ามาอ่านเว็บเราเท่าไหร่และดูหน้าไหนบ้าง
