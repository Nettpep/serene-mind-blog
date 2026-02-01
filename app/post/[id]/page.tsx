import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/markdown'
import { extractTocFromHtml } from '@/lib/toc'
import { formatThaiDate } from '@/lib/date'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import TableOfContents from '@/components/TableOfContents'
import SeriesNavigation from '@/components/SeriesNavigation'
import ShareButtons from '@/components/ShareButtons'
import RelatedPosts from '@/components/RelatedPosts'
import ProductRecommendation from '@/components/ProductRecommendation'
import AdCard from '@/components/AdCard'
import ScrollToTop from './ScrollToTop'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BlogPostDetail({ params }: PageProps) {
  const { id } = await params
  const post = await getPostBySlug(id)

  if (!post) {
    notFound()
  }

  // Extract TOC from HTML content
  const tocItems = extractTocFromHtml(post.content)

  // Get all posts for series navigation
  const allPosts = await getAllPosts()

  return (
    <>
      <ScrollToTop />
      <ReadingProgressBar />

      <main className="pt-32 pb-20 min-h-screen relative bg-zen-bg">
        {/* Header Section */}
        <header className="container mx-auto px-6 mb-16 max-w-4xl text-center">
          <Link href="/" className="inline-flex items-center text-zen-muted hover:text-zen-accent mb-10 transition-colors text-xs font-bold uppercase tracking-widest gap-2">
            <ArrowLeft size={14} /> กลับหน้าแรก
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-zen-text leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-zen-text/60 font-medium py-4">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-zen-accent" /> {formatThaiDate(post.date)}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-2">
              <User size={16} className="text-zen-accent" /> กองบรรณาธิการ
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-zen-accent bg-zen-accent/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="container mx-auto px-6 max-w-5xl mb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl shadow-stone-200">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        </div>

        {/* Content Layout */}
        <div className="container mx-auto px-6 flex flex-col lg:flex-row max-w-6xl relative">

          {/* Main Article */}
          <article className="w-full lg:w-3/4 pr-0 lg:pr-16 mx-auto">

            {/* Series Navigation - Top */}
            {post.series && (
              <SeriesNavigation currentPost={post} allPosts={allPosts} />
            )}

            {/* Typography Content */}
            <div
              className="prose prose-slate prose-lg max-w-none 
              prose-headings:font-serif prose-headings:text-zen-text prose-headings:font-normal
              prose-p:text-zen-text/80 prose-p:font-light prose-p:leading-8 prose-p:mb-8
              prose-blockquote:border-l-4 prose-blockquote:border-zen-accent prose-blockquote:pl-6 prose-blockquote:py-2
              prose-blockquote:text-xl prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-zen-text prose-blockquote:bg-white prose-blockquote:rounded-r-lg
              prose-strong:text-zen-text prose-strong:font-bold
              prose-a:text-zen-accent prose-a:no-underline hover:prose-a:underline
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-16 pt-8 border-t border-stone-200">
              <div className="flex gap-3 flex-wrap">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs text-zen-text/60 bg-white border border-stone-200 px-4 py-2 rounded-full hover:border-zen-accent hover:text-zen-accent transition-colors cursor-pointer shadow-sm">
                    <Tag size={12} /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-12">
              <ShareButtons
                url={`/post/${post.id}`}
                title={post.title}
                description={post.excerpt}
              />
            </div>

            {/* Series Navigation - Bottom */}
            {post.series && (
              <SeriesNavigation currentPost={post} allPosts={allPosts} />
            )}

            {/* Sponsored Content - End of Post */}
            <div className="mt-20 pt-16 border-t-2 border-stone-100">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-zen-accent to-zen-accent" />
                  <h3 className="text-lg font-serif text-zen-text font-bold">
                    สินค้าแนะนำ
                  </h3>
                  <div className="w-16 h-[2px] bg-gradient-to-l from-transparent via-zen-accent to-zen-accent" />
                </div>
                <p className="text-sm text-zen-muted max-w-md mx-auto">
                  สินค้าคุณภาพที่เราคัดสรรมาเพื่อช่วยส่งเสริมการฝึกสมาธิและการดำรงชีวิตอย่างมีสติ
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

            {/* Related Posts */}
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-1/4 relative">
            {/* Table of Contents - Sticky (เลื่อนตาม) */}
            <div className="sticky top-32">
              <TableOfContents items={tocItems} />
            </div>

            {/* Ad Space - Static (ไม่เลื่อนตาม, อยู่ด้านล่าง) */}
            <div className="mt-8 space-y-6">
              <AdCard
                title="หนังสือ: วิปัสสนาเบื้องต้น"
                description="คู่มือฝึกสมาธิและปัญญา สำหรับผู้เริ่มต้น เขียนโดยพระอาจารย์ชื่อดัง"
                imageUrl="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=250&fit=crop"
                ctaText="ซื้อเลย"
                ctaLink="#"
                type="affiliate"
              />
            </div>
          </aside>

        </div>
      </main>
    </>
  )
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    id: slug,
  }))
}
