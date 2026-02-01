# วิธีหา Direct Image URL จาก Unsplash

## วิธีที่ 1: Copy Image Address (แนะนำ)

1. ไปที่ Unsplash photo page (เช่น https://unsplash.com/photos/P-yzuyWFEIk)
2. **คลิกขวาที่รูป** → เลือก "Copy image address"
3. จะได้ URL แบบนี้:
   ```
   https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop
   ```

## วิธีที่ 2: ใช้ Download Button

1. ไปที่ Unsplash photo page
2. คลิกปุ่ม **"Download"** (หรือ "Download free")
3. เลือกขนาดที่ต้องการ
4. คลิกขวาที่รูป → "Copy image address"
5. หรือดู source code ของหน้าเว็บ

## วิธีที่ 3: แปลง Photo ID เป็น Image URL

ถ้าคุณมี Photo ID (เช่น `P-yzuyWFEIk`) คุณต้องหา numeric ID ก่อน:

1. ไปที่ photo page
2. ดู source code (F12)
3. หา `photo-[numeric-id]` ใน HTML
4. ใช้ URL pattern:
   ```
   https://images.unsplash.com/photo-[numeric-id]?w=1200&q=80&auto=format&fit=crop
   ```

## URL Pattern ที่ใช้ได้:

```
https://images.unsplash.com/photo-[numeric-id]?w=1200&q=80&auto=format&fit=crop
```

**Parameters:**
- `w=1200` - ความกว้าง (pixels)
- `q=80` - คุณภาพ (0-100)
- `auto=format` - Auto format
- `fit=crop` - Fit mode
