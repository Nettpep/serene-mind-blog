import BlogCard from '@/components/BlogCard'
import { BlogPost } from '@/types'
import type { Locale } from '@/i18n-config'

interface PostListProps {
  posts: BlogPost[]
  locale: Locale
  dictionary: {
    post: {
      readMore: string
    }
    search?: {
      noPosts?: string
    }
  }
}

export default function PostList({ posts, locale, dictionary }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {posts.length > 0 ? (
        posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            locale={locale}
            dictionary={dictionary}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-zen-muted py-12">
          {locale === 'th' ? 'ไม่พบบทความ' : 'No posts found'}
        </div>
      )}
    </div>
  )
}
