import Hero from '@/components/Hero'
import DailyQuote from '@/components/DailyQuote'
import PostList from '@/components/PostList'
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
      </main>
    </>
  )
}
