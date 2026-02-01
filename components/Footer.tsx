'use client'

import React from 'react';
import { useDictionary } from '@/lib/use-dictionary';

const Footer: React.FC = () => {
  const { dict } = useDictionary();

  if (!dict) return null;
  return (
    <footer className="bg-white border-t border-stone-100 py-20 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          {/* Brand */}
          <div className="max-w-sm">
            <h4 className="font-serif text-2xl text-zen-text mb-6 font-bold tracking-wide">SERENE MIND</h4>
            <p className="text-zen-text/60 text-sm font-light leading-relaxed mb-6">
              พื้นที่สำหรับการตื่นรู้ เข้าใจตนเอง และเข้าใจโลกผ่านมุมมองของจิตวิทยาและพุทธธรรม
              เราเชื่อว่า "ความสงบ" เริ่มต้นจากการเข้าใจเหตุและผล
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-auto p-8 bg-zen-bg rounded-2xl">
            <h5 className="text-zen-text font-serif text-lg mb-2">{dict.nav.blog}</h5>
            <p className="text-zen-text/50 text-xs mb-6">{dict.footer.newsletterDescription}</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="อีเมลของคุณ"
                className="bg-white border border-stone-200 px-4 py-3 text-zen-text focus:outline-none focus:border-zen-accent focus:ring-1 focus:ring-zen-accent w-full sm:w-64 rounded-lg transition-all text-sm"
              />
              <button className="bg-zen-text text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-zen-accent transition-colors shadow-lg shadow-stone-200">
                สมัครสมาชิก
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-stone-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zen-muted">
          <p>&copy; {new Date().getFullYear()} Serene Mind Blog. {dict.footer.copyright}</p>
          <div className="flex gap-8 mt-4 md:mt-0 font-medium">
            <a href="#" className="hover:text-zen-accent transition-colors">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-zen-accent transition-colors">ข้อกำหนดการใช้งาน</a>
            <a href="#" className="hover:text-zen-accent transition-colors">ติดต่อเรา</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;