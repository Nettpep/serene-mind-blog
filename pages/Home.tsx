import React from 'react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import { BLOG_POSTS } from '../constants';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <main id="latest-posts" className="container mx-auto px-6 py-32 relative z-10">
        <div className="text-center mb-20">
           <span className="text-zen-accent uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Our Stories</span>
           <h2 className="font-serif text-4xl md:text-5xl text-zen-text mb-6">บทความล่าสุด</h2>
           <p className="text-zen-text/60 max-w-xl mx-auto font-light leading-relaxed">
             เรื่องราวที่คัดสรรมาเพื่อช่วยให้คุณเข้าใจตนเองและโลกใบนี้มากขึ้น 
             ผ่านมุมมองที่เรียบง่ายและนำไปใช้ได้จริง
           </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;