import Hero from '@/components/Hero'
import DailyQuote from '@/components/DailyQuote'
import PostList from '@/components/PostList'
import ProductRecommendation from '@/components/ProductRecommendation'
import { getAllPosts } from '@/lib/markdown'

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <>
      <Hero />

      {/* Daily Dharma Quote */}
      <section className="container mx-auto px-6 py-16 relative z-10 -mt-20">
        <DailyQuote />
      </section>

      <main id="latest-posts" className="container mx-auto px-6 py-32 relative z-10">
        <div className="text-center mb-12">
          <span className="text-zen-accent uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Our Stories</span>
          <h2 className="font-serif text-4xl md:text-5xl text-zen-text mb-6">บทความล่าสุด</h2>
          <p className="text-zen-text/60 max-w-xl mx-auto font-light leading-relaxed">
            เรื่องราวที่คัดสรรมาเพื่อให้คุณเข้าใจตนเองและโลกใบนี้มากขึ้น
            ผ่านมุมมองที่เรียบง่ายและนำไปใช้ได้จริง
          </p>
        </div>

        <PostList initialPosts={posts} />

        {/* Product Recommendations (หน้าแรก) */}
        <div className="mt-16 pt-12 border-t border-stone-200 max-w-6xl mx-auto">
          <h3 className="text-sm uppercase tracking-[0.3em] text-zen-muted font-bold mb-6 text-center">
            แนะนำสินค้า
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductRecommendation
              name="หมอนนั่งสมาธิ Zafu แบบดั้งเดิม"
              description="หมอนนั่งสมาธิคุณภาพสูง เหมาะสำหรับผู้ฝึกสมาธิทุกระดับ"
              price={890}
              originalPrice={1290}
              rating={5}
              imageUrl="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=400&fit=crop"
              affiliateLink="#"
              category="อุปกรณ์สมาธิ"
              inStock={true}
            />
            <ProductRecommendation
              name="ธูปหอม Mindfulness Collection"
              description="ธูปหอมธรรมชาติ กลิ่นสงบ เหมาะสำหรับการฝึกสมาธิ"
              price={350}
              rating={4}
              imageUrl="https://images.unsplash.com/photo-1598543535441-72ad7e9b6b41?w=400&h=400&fit=crop"
              affiliateLink="#"
              category="ธูปหอม"
              inStock={true}
            />
            <ProductRecommendation
              name="หนังสือ: วิปัสสนาเบื้องต้น"
              description="คู่มือฝึกสมาธิและปัญญา สำหรับผู้เริ่มต้น"
              price={450}
              rating={5}
              imageUrl="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=400&fit=crop"
              affiliateLink="#"
              category="หนังสือ"
              inStock={true}
            />
            <ProductRecommendation
              name="ผ้าคลุมไหล่สำหรับสมาธิ"
              description="ผ้าคลุมไหล่เนื้อนุ่ม อบอุ่น เหมาะสำหรับการนั่งสมาธิ"
              price={590}
              rating={4}
              imageUrl="https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop"
              affiliateLink="#"
              category="อุปกรณ์สมาธิ"
              inStock={true}
            />
          </div>
          
          {/* Trust Badge */}
          <div className="mt-8 text-center">
            <p className="text-xs text-zen-muted">
              ✓ คัดสรรโดยผู้เชี่ยวชาญ  •  ✓ คุณภาพรับรอง
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
