import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/markdown'

export async function GET() {
  try {
    const posts = await getAllPosts()
    // Return only searchable fields (no HTML content)
    const searchablePosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      imageUrl: post.imageUrl,
      category: post.category,
      tags: post.tags,
    }))
    return NextResponse.json(searchablePosts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json([], { status: 500 })
  }
}
