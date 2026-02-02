# Performance Refactor Plan

## 🎯 เป้าหมาย
ลดเวลา page transition จาก ~1-2s เหลือ < 500ms และปรับปรุง perceived performance

## 📊 ปัญหาที่พบ

### 1. ใช้ Client Components มากเกินไป (20+ files)
**ผลกระทบ:** 
- JavaScript bundle ใหญ่ (ต้องดาวน์โหลด + parse + execute)
- Hydration ช้า
- Re-render บ่อย

**Components ที่ควรเป็น Server:**
- ✅ Hero (ไม่มี interaction จริงๆ)
- ✅ Footer (static content)
- ✅ ProductRecommendation (static, ไม่ต้อง interactive)
- ✅ DailyQuote (แค่แสดงข้อความ)
- ✅ BlogCard (ใช้ Link แทน client-side navigation)

**Components ที่ต้องเป็น Client:**
- ❌ Header (scroll state, mobile menu)
- ❌ SearchBar (search state, Fuse.js)
- ❌ LanguageSwitcher (dropdown state)
- ❌ CategoryFilter (filter state)
- ❌ PostList (filter state) - แต่อาจย้ายไป URL params

---

### 2. ใช้ <img> แทน Next.js <Image>
**ตำแหน่ง:**
- `Hero.tsx` line 25: <img src="https://images.unsplash.com/..." />

**ผลกระทบ:**
- ไม่มี lazy loading
- ไม่ optimize ขนาด
- ไม่มี blur placeholder

**แก้ไข:**
```tsx
// Before
<img src="..." className="..." />

// After
<Image 
  src="..." 
  alt="..." 
  fill 
  priority  // สำหรับ hero image
  className="..." 
/>
```

---

### 3. ไม่มี Loading UI
**ผลกระทบ:** รู้สึกว่า app "แข็ง" ตอนเปลี่ยนหน้า

**แก้ไข:** สร้าง `loading.tsx` ใน:
- `app/[lang]/loading.tsx` - Loading สำหรับหน้าแรก
- `app/[lang]/post/[id]/loading.tsx` - Loading สำหรับหน้าบทความ

---

### 4. PostList Filter ใน Client State
**ปัญหา:** เมื่อเปลี่ยน category → re-render ทั้งหน้า

**แก้ไข:** ใช้ URL Search Params
```tsx
// Before: Client state
const [filtered, setFiltered] = useState(posts)

// After: URL params (Server Component)
// URL: /?category=innerPeace
const posts = getPostsByCategory(allPosts, searchParams.category)
```

---

### 5. Header Scroll Listener
**ปัญหา:** `useEffect` + `addEventListener('scroll')` ทำงานทุกครั้งที่ scroll

**แก้ไข:** 
1. ใช้ CSS `position: sticky` แทนถ้าเป็นไปได้
2. หรือ throttle/debounce scroll event

---

### 6. ไม่มี Suspense Boundaries
**ผลกระทบ:** Component หนึ่งช้า → blocking ทั้งหน้า

**แก้ไข:** Wrap async components ด้วย Suspense
```tsx
<Suspense fallback={<SkeletonCard />}>
  <PostList />
</Suspense>
```

---

### 7. SearchBar โหลดทันที
**ปัญหา:** Fuse.js (~50KB) โหลดแม้ไม่ได้ใช้

**แก้ไข:** Dynamic import
```tsx
const SearchBar = dynamic(() => import('./SearchBar'), {
  loading: () => <div>Loading search...</div>,
  ssr: false
})
```

---

## 🔨 Implementation Order

### Phase 1: Quick Wins (1-2 ชม.) ⚡
1. ✅ เพิ่ม `loading.tsx` (perceived performance)
2. ✅ เปลี่ยน Hero `<img>` → `<Image>` with priority
3. ✅ Dynamic import SearchBar

### Phase 2: Major Refactor (3-4 ชม.) 🔧
4. ✅ แปลง Hero, Footer, ProductRec, DailyQuote → Server Components
5. ✅ ย้าย PostList filtering → URL params (Server-side)
6. ✅ เพิ่ม Suspense boundaries

### Phase 3: Optimization (2-3 ชม.) 🚀  
7. ✅ Throttle Header scroll listener
8. ✅ Memoize expensive computations
9. ✅ Add View Transitions API (optional)
10. ✅ Optimize image loading strategies

---

## 📈 Expected Results

**Before:**
- Initial bundle: ~500KB
- Page transition: 1-2s
- Lighthouse Performance: 60-70

**After:**
- Initial bundle: ~200KB (-60%)
- Page transition: 300-500ms (-70%)
- Lighthouse Performance: 85-95 (+30%)

---

## ⚠️ Breaking Changes
- PostList props จะเปลี่ยน (ไม่ต้อง onFilterChange)
- Hero, Footer ต้องเป็น Server Components (ไม่มี useState, useEffect)
