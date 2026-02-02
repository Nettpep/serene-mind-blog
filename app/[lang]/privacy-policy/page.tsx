import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Shield } from 'lucide-react'
import { getDictionary } from '@/lib/get-dictionary'
import type { Locale } from '@/i18n-config'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'th' ? 'นโยบายความเป็นส่วนตัว | Serene Mind' : 'Privacy Policy | Serene Mind',
    description:
      lang === 'th'
        ? 'นโยบายความเป็นส่วนตัวของ Serene Mind'
        : 'Serene Mind privacy policy.',
  }
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <main className="pt-32 pb-20 min-h-screen relative bg-zen-bg">
      <header className="container mx-auto px-6 mb-12 max-w-4xl">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center text-zen-muted hover:text-zen-accent mb-10 transition-colors text-xs font-bold uppercase tracking-widest gap-2"
        >
          <ArrowLeft size={14} /> {dictionary.post.backToHome}
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-zen-accent" size={22} />
          <h1 className="font-serif text-4xl md:text-5xl text-zen-text leading-[1.2]">
            {dictionary.footer.privacyPolicy}
          </h1>
        </div>
        <p className="text-zen-text/60 text-sm font-light">
          {lang === 'th'
            ? 'อัปเดตล่าสุด: 2 ก.พ. 2026'
            : 'Last updated: Feb 2, 2026'}
        </p>
      </header>

      <section className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100 space-y-8 text-zen-text/80 leading-[1.9] font-light">
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'ภาพรวม' : 'Overview'}
            </h2>
            <p>
              {lang === 'th'
                ? 'Serene Mind ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งาน เอกสารนี้อธิบายว่าเราเก็บ ใช้ และปกป้องข้อมูลอย่างไรเมื่อคุณเข้าชมเว็บไซต์ของเรา'
                : 'Serene Mind values your privacy. This policy explains how we collect, use, and protect information when you visit our website.'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'ข้อมูลที่เราเก็บ' : 'Information We Collect'}
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                {lang === 'th'
                  ? 'ข้อมูลการใช้งานแบบรวม (เช่น จำนวนผู้เข้าชม หน้าที่ถูกเปิด อุปกรณ์/เบราว์เซอร์) เพื่อวิเคราะห์และปรับปรุงเว็บไซต์'
                  : 'Aggregated usage data (e.g., visits, pages viewed, device/browser) to understand and improve the site.'}
              </li>
              <li>
                {lang === 'th'
                  ? 'ข้อมูลที่คุณส่งให้เราโดยสมัครใจ (เช่น อีเมล หากคุณติดต่อเรา)'
                  : 'Information you provide voluntarily (e.g., email when contacting us).'}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'คุกกี้และการวิเคราะห์' : 'Cookies & Analytics'}
            </h2>
            <p>
              {lang === 'th'
                ? 'เราอาจใช้เครื่องมือวิเคราะห์ (เช่น Google Analytics หรือ Vercel Analytics) เพื่อดูภาพรวมการใช้งาน ข้อมูลที่ได้จะอยู่ในรูปแบบสถิติรวม ไม่ได้มีไว้เพื่อระบุตัวตนของคุณโดยตรง'
                : 'We may use analytics tools (e.g., Google Analytics or Vercel Analytics) to understand usage. Data is generally aggregated and not intended to directly identify you.'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'การแบ่งปันข้อมูล' : 'Sharing'}
            </h2>
            <p>
              {lang === 'th'
                ? 'เราไม่ขายข้อมูลส่วนบุคคลของคุณ เราอาจแบ่งปันข้อมูลกับผู้ให้บริการที่ช่วยให้เว็บไซต์ทำงานได้ (เช่น ผู้ให้บริการโฮสติ้ง/วิเคราะห์) เท่าที่จำเป็นเท่านั้น'
                : 'We do not sell your personal information. We may share data with service providers (hosting/analytics) only as necessary to operate the site.'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'ลิงก์ภายนอก' : 'External Links'}
            </h2>
            <p>
              {lang === 'th'
                ? 'เว็บไซต์อาจมีลิงก์ไปยังเว็บไซต์ภายนอก เราไม่รับผิดชอบนโยบายความเป็นส่วนตัวของเว็บไซต์เหล่านั้น'
                : 'The site may contain links to external websites. We are not responsible for their privacy practices.'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'ติดต่อเรา' : 'Contact'}
            </h2>
            <p>
              {lang === 'th'
                ? 'หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อเราได้ที่'
                : 'If you have questions about this policy, contact us at'}{' '}
              <a className="text-zen-accent hover:underline" href="mailto:contact@serenemind.com">
                contact@serenemind.com
              </a>
              .
            </p>
            <p className="text-xs text-zen-muted pt-2">
              {lang === 'th'
                ? 'หมายเหตุ: เอกสารนี้เป็นแนวทางทั่วไป ไม่ใช่คำปรึกษาทางกฎหมาย'
                : 'Note: This document is general guidance and not legal advice.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
