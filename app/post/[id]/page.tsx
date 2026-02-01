import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import { getPostBySlug, getAllPostSlugs } from '@/lib/markdown'
import { extractTocFromHtml } from '@/lib/toc'
import { formatThaiDate } from '@/lib/date'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import TableOfContents from '@/components/TableOfContents'
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
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-1/4 relative">
             <TableOfContents items={tocItems} />
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
