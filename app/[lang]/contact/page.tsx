import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react'
import { getDictionary } from '@/lib/get-dictionary'
import type { Locale } from '@/i18n-config'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'th' ? 'ติดต่อเรา | Serene Mind' : 'Contact Us | Serene Mind',
    description:
      lang === 'th'
        ? 'ช่องทางติดต่อ Serene Mind'
        : 'Contact Serene Mind.',
  }
}

export default async function ContactPage({ params }: PageProps) {
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
          <MessageCircle className="text-zen-accent" size={22} />
          <h1 className="font-serif text-4xl md:text-5xl text-zen-text leading-[1.2]">
            {dictionary.footer.contactUs}
          </h1>
        </div>
        <p className="text-zen-text/70 font-light leading-relaxed max-w-2xl">
          {lang === 'th'
            ? 'หากคุณมีคำถาม ข้อเสนอแนะ หรืออยากติดต่อเรื่องความร่วมมือ เรายินดีรับฟัง'
            : 'If you have questions, feedback, or partnership inquiries, we’d love to hear from you.'}
        </p>
      </header>

      <section className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-zen-text mb-4 font-normal flex items-center gap-2">
                <Mail size={18} className="text-zen-accent" />
                {lang === 'th' ? 'อีเมล' : 'Email'}
              </h2>
              <p className="text-zen-text/80 leading-relaxed font-light mb-4">
                {lang === 'th'
                  ? 'ติดต่อเราได้ที่อีเมลด้านล่าง เราจะพยายามตอบกลับภายใน 3–5 วันทำการ'
                  : 'Reach us at the email below. We typically respond within 3–5 business days.'}
              </p>
              <a
                href="mailto:contact@serenemind.com"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-zen-bg border border-stone-200 text-zen-text hover:border-zen-accent hover:text-zen-accent transition-colors font-medium"
              >
                contact@serenemind.com
              </a>
              <p className="text-xs text-zen-muted mt-3">
                {lang === 'th'
                  ? 'หมายเหตุ: กรุณาอย่าส่งข้อมูลส่วนบุคคลที่อ่อนไหวผ่านอีเมล'
                  : 'Note: Please avoid sending sensitive personal information via email.'}
              </p>
            </div>

            <div className="w-full md:w-72 bg-zen-bg rounded-2xl p-6 border border-stone-200">
              <h3 className="font-serif text-xl text-zen-text mb-3 font-normal">
                {lang === 'th' ? 'เรื่องที่ติดต่อบ่อย' : 'Common topics'}
              </h3>
              <ul className="text-sm text-zen-text/70 space-y-2 font-light">
                <li>{lang === 'th' ? '• ข้อเสนอแนะเกี่ยวกับบทความ' : '• Article feedback'}</li>
                <li>{lang === 'th' ? '• แจ้งปัญหาเว็บไซต์' : '• Report a site issue'}</li>
                <li>{lang === 'th' ? '• ความร่วมมือ/สปอนเซอร์' : '• Partnerships/sponsorships'}</li>
                <li>{lang === 'th' ? '• เรื่องลิขสิทธิ์' : '• Copyright questions'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
