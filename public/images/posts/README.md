# รูปภาพบทความ

โฟลเดอร์นี้ใช้เก็บรูปภาพที่คุณสร้างเองสำหรับบทความ

## วิธีใช้:

1. **วางรูปภาพในโฟลเดอร์นี้** (เช่น `my-featured-image.jpg`)

2. **ใช้ใน Frontmatter ของบทความ:**
   ```markdown
   ---
   id: '1'
   title: 'ชื่อบทความ'
   imageUrl: '/images/posts/my-featured-image.jpg'
   ---
   ```

3. **ใช้ในเนื้อหาบทความ:**
   ```markdown
   ![คำอธิบายรูป](/images/posts/my-image.jpg)
   ```

## หมายเหตุ:
- ไฟล์ใน `public/` จะถูก serve ที่ root path (`/`)
- ใช้ `/images/posts/...` ไม่ใช่ `./images/posts/...`
- แนะนำขนาดรูป: Featured Image 1200x600px ขึ้นไป, รูปในเนื้อหา 800-1200px width
