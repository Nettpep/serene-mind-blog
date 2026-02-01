import Hero from '@/components/Hero'
import DailyQuote from '@/components/DailyQuote'
import PostList from '@/components/PostList'
import ProductRecommendation from '@/components/ProductRecommendation'
import { getAllPosts } from '@/lib/markdown'
import { getDictionary } from '@/lib/get-dictionary'
import type { Locale } from '@/i18n-config'

interface PageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const posts = await getAllPosts(lang)
  
  return (
    <>
      <Hero locale={lang} dictionary={dictionary} />

      {/* Daily Dharma Quote */}
      <section className="container mx-auto px-6 py-16 relative z-10 -mt-20">
        <DailyQuote locale={lang} dictionary={dictionary} />
      </section>

      <main id="latest-posts" className="container mx-auto px-6 py-32 relative z-10">
        <div className="text-center mb-12">
          <span className="text-zen-accent uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Our Stories</span>
          <h2 className="font-serif text-4xl md:text-5xl text-zen-text mb-6">
            {lang === 'th' ? 'บทความล่าสุด' : 'Latest Articles'}
          </h2>
          <p className="text-zen-text/60 max-w-xl mx-auto font-light leading-relaxed">
            {lang === 'th' 
              ? 'เรื่องราวที่คัดสรรมาเพื่อให้คุณเข้าใจตนเองและโลกใบนี้มากขึ้น ผ่านมุมมองที่เรียบง่ายและนำไปใช้ได้จริง'
              : 'Stories carefully selected to help you understand yourself and the world better through simple and practical perspectives'
            }
          </p>
        </div>

        <PostList initialPosts={posts} locale={lang} dictionary={dictionary} />

        {/* Product Recommendations (หน้าแรก) */}
        <div className="mt-16 pt-12 border-t border-stone-200 max-w-6xl mx-auto">
          <h3 className="text-sm uppercase tracking-[0.3em] text-zen-muted font-bold mb-6 text-center">
            {dictionary.post.recommendedProducts}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductRecommendation
              name={lang === 'th' ? 'หมอนนั่งสมาธิ Zafu แบบดั้งเดิม' : 'Traditional Zafu Meditation Cushion'}
              description={lang === 'th' 
                ? 'หมอนนั่งสมาธิคุณภาพสูง เหมาะสำหรับผู้ฝึกสมาธิทุกระดับ'
                : 'High-quality meditation cushion suitable for practitioners of all levels'
              }
              price={890}
              originalPrice={1290}
              rating={5}
              imageUrl="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=400&fit=crop"
              affiliateLink="#"
              category={lang === 'th' ? 'อุปกรณ์สมาธิ' : 'Meditation Equipment'}
              inStock={true}
              locale={lang}
              dictionary={dictionary}
            />
            <ProductRecommendation
              name={lang === 'th' ? 'ธูปหอม Mindfulness Collection' : 'Mindfulness Collection Incense'}
              description={lang === 'th'
                ? 'ธูปหอมธรรมชาติ กลิ่นสงบ เหมาะสำหรับการฝึกสมาธิ'
                : 'Natural incense with calming scents, perfect for meditation practice'
              }
              price={350}
              rating={4}
              imageUrl="https://images.unsplash.com/photo-1598543535441-72ad7e9b6b41?w=400&h=400&fit=crop"
              affiliateLink="#"
              category={lang === 'th' ? 'ธูปหอม' : 'Incense'}
              inStock={true}
              locale={lang}
              dictionary={dictionary}
            />
            <ProductRecommendation
              name={lang === 'th' ? 'หนังสือ: วิปัสสนาเบื้องต้น' : 'Book: Introduction to Vipassana'}
              description={lang === 'th'
                ? 'คู่มือฝึกสมาธิและปัญญา สำหรับผู้เริ่มต้น'
                : 'A guide to meditation and wisdom for beginners'
              }
              price={450}
              rating={5}
              imageUrl="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=400&fit=crop"
              affiliateLink="#"
              category={lang === 'th' ? 'หนังสือ' : 'Books'}
              inStock={true}
              locale={lang}
              dictionary={dictionary}
            />
            <ProductRecommendation
              name={lang === 'th' ? 'ผ้าคลุมไหล่สำหรับสมาธิ' : 'Meditation Shawl'}
              description={lang === 'th'
                ? 'ผ้าคลุมไหล่เนื้อนุ่ม อบอุ่น เหมาะสำหรับการนั่งสมาธิ'
                : 'Soft, warm shawl perfect for meditation sessions'
              }
              price={590}
              rating={4}
              imageUrl="https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop"
              affiliateLink="#"
              category={lang === 'th' ? 'อุปกรณ์สมาธิ' : 'Meditation Equipment'}
              inStock={true}
              locale={lang}
              dictionary={dictionary}
            />
          </div>
          
          {/* Trust Badge */}
          <div className="mt-8 text-center">
            <p className="text-xs text-zen-muted">
              ✓ {dictionary.post.expertSelected}  •  ✓ {dictionary.post.qualityGuaranteed}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
