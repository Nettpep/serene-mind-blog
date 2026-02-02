# Serene Mind Blog

บล็อกที่เน้นเรื่องจิตวิทยา สมาธิ และกฎอิทัปปัจจยตา สร้างด้วย Next.js

## คุณสมบัติ

- ⚡ Next.js 15 with App Router
- 🎨 Tailwind CSS with custom Zen theme
- 📱 Responsive design
- 🔍 SEO optimized
- 🖼️ Image optimization with Next.js Image
- 📖 Reading progress bar
- 📑 Table of contents
- 📝 Markdown-based content (gray-matter + remark)

## การติดตั้ง

**Prerequisites:** Node.js 18+ 

1. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

2. รัน development server:
   ```bash
   npm run dev
   ```

3. เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## การ Build สำหรับ Production

```bash
npm run build
npm start
```

## โครงสร้างโปรเจกต์

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── post/[id]/         # Dynamic blog post pages
│   └── globals.css        # Global styles
├── components/            # React components
├── content/               # Markdown content
│   └── posts/            # Blog post markdown files
├── lib/                   # Utility functions
│   ├── markdown.ts        # Markdown parsing
│   ├── toc.ts            # Table of contents extraction
│   └── date.ts           # Date formatting
└── types.ts              # TypeScript types
```

## 📝 การเขียนบทความ

บทความถูกเก็บในรูปแบบ **Markdown files** ในโฟลเดอร์ `content/posts/`

### ขั้นตอนการเขียนบทความใหม่:

1. **สร้างไฟล์ใหม่** ใน `content/posts/` เช่น `5.md`
2. **เขียน Frontmatter** (ข้อมูลเมตา) ที่บรรทัดแรก
3. **เขียนเนื้อหา** ในรูปแบบ Markdown
4. **เพิ่ม ID ให้ headings** สำหรับ Table of Contents

### ตัวอย่างไฟล์บทความ:

```markdown
---
id: '5'
title: 'ชื่อบทความ'
excerpt: 'คำอธิบายสั้นๆ'
date: '2024-01-15'
readTime: '5 นาที'
imageUrl: 'https://images.unsplash.com/...'
category: 'หมวดหมู่'
tags: ['tag1', 'tag2']
---

เนื้อหาบทความเริ่มต้นที่นี่...

## หัวข้อหลัก {#section-id}

เนื้อหาของหัวข้อ...
```

📖 **ดูคู่มือการเขียนแบบละเอียด:** [docs/WRITING_GUIDE.md](docs/WRITING_GUIDE.md)

## โฆษณา/สินค้าแนะนำ

ส่วนโฆษณาและสินค้าแนะนำถูก **ซ่อนไว้โดยค่าเริ่มต้น** เมื่อพร้อมให้แสดง:

1. สร้างไฟล์ `.env.local` (หรือ copy จาก `.env.example`)
2. ใส่ `NEXT_PUBLIC_SHOW_PRODUCT_ADS=true`
3. รัน `npm run dev` ใหม่

ดูรายละเอียดใน [lib/site-config.ts](lib/site-config.ts)

## ดูจำนวนคนเข้าเว็บ (Analytics)

ต้องการดูว่ามีคนเข้ามาอ่านเท่าไหร่ ดูจากที่ไหน:

- **Google Analytics (GA4)** – ฟรี, ดูได้ที่ [analytics.google.com](https://analytics.google.com)
- **Vercel Analytics** – ใช้ได้เมื่อ deploy บน Vercel, ดูได้ที่ Vercel Dashboard
- **Plausible / Umami** – ทางเลือกเน้นความเป็นส่วนตัว

📊 **ขั้นตอนตั้งค่าและตัวเลือก:** [docs/ANALYTICS_GUIDE.md](docs/ANALYTICS_GUIDE.md)
