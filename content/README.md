# Content Directory

โฟลเดอร์นี้เก็บไฟล์ Markdown สำหรับบทความบล็อก

## โครงสร้าง

```
content/
└── posts/
    ├── 1.md
    ├── 2.md
    └── ...
```

## รูปแบบไฟล์ Markdown

แต่ละไฟล์ Markdown ต้องมี **Frontmatter** ที่บรรทัดแรก:

```markdown
---
id: '1'
title: 'ชื่อบทความ'
excerpt: 'คำอธิบายสั้นๆ'
date: '2023-10-12'  # ใช้รูปแบบ ISO (YYYY-MM-DD)
readTime: '7 นาที'
imageUrl: 'https://...'
category: 'หมวดหมู่'
tags: ['tag1', 'tag2']
---

เนื้อหาบทความในรูปแบบ Markdown...
```

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | ID ของบทความ (ใช้เป็น slug) |
| `title` | string | ✅ | ชื่อบทความ |
| `excerpt` | string | ✅ | คำอธิบายสั้นๆ |
| `date` | string | ✅ | วันที่ (ISO format: YYYY-MM-DD) |
| `readTime` | string | ✅ | เวลาอ่าน (เช่น "7 นาที") |
| `imageUrl` | string | ✅ | URL รูปภาพหลัก |
| `category` | string | ✅ | หมวดหมู่ |
| `tags` | string[] | ✅ | Array ของ tags |

## การสร้าง Table of Contents

เพื่อให้ Table of Contents ทำงานได้ ให้ใช้ heading พร้อม ID:

```markdown
## หัวข้อหลัก {#section-id}
```

ตัวอย่าง:
```markdown
## ความหมายที่แท้จริง {#meaning}
## ประโยชน์ทางจิตวิทยา {#psychology}
```

## Markdown Features

รองรับ Markdown features ต่อไปนี้:
- ✅ Headings (H1-H6)
- ✅ Paragraphs
- ✅ **Bold** และ *Italic*
- ✅ Lists (ordered และ unordered)
- ✅ Blockquotes
- ✅ Links
- ✅ Images
- ✅ Code blocks
- ✅ Tables (ผ่าน remark-gfm)

## ตัวอย่างไฟล์

ดูตัวอย่างได้ที่ `content/posts/1.md` และ `content/posts/2.md`
