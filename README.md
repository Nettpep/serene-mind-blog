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
