import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, FileText } from 'lucide-react'
import { getDictionary } from '@/lib/get-dictionary'
import type { Locale } from '@/i18n-config'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'th' ? 'ข้อกำหนดและเงื่อนไขการใช้งาน | Serene Mind' : 'Terms of Service | Serene Mind',
    description:
      lang === 'th'
        ? 'ข้อกำหนดและเงื่อนไขการใช้งานของ Serene Mind'
        : 'Serene Mind terms of service.',
  }
}

export default async function TermsOfServicePage({ params }: PageProps) {
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
          <FileText className="text-zen-accent" size={22} />
          <h1 className="font-serif text-4xl md:text-5xl text-zen-text leading-[1.2]">
            {lang === 'th' ? 'ข้อกำหนดและเงื่อนไขการใช้งาน' : 'Terms of Service'}
          </h1>
        </div>
        <p className="text-zen-text/60 text-sm font-light">
          {lang === 'th'
            ? 'ปรับปรุงล่าสุดเมื่อ: 2 ก.พ. 2026'
            : 'Last updated: Feb 2, 2026'}
        </p>
      </header>

      <section className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100 space-y-8 text-zen-text/80 leading-[1.9] font-light">
          {/* การยอมรับข้อกำหนด + Privacy Policy link */}
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'การยอมรับข้อกำหนด' : 'Acceptance of Terms'}
            </h2>
            <p>
              {lang === 'th'
                ? 'การเข้าถึงหรือใช้งาน Serene Mind ถือว่าคุณยอมรับข้อกำหนดเหล่านี้ หากไม่ตกลง โปรดระงับการใช้งาน'
                : 'By accessing or using Serene Mind, you agree to these terms. If you do not agree, please discontinue use.'}
            </p>
            <p className="mt-3 text-sm text-zen-text/70">
              {lang === 'th' ? 'การใช้งานเว็บไซต์นี้เป็นไปตาม' : 'Use of this site is also subject to our'}{' '}
              <Link href={`/${lang}/privacy-policy`} className="text-zen-accent hover:underline font-medium">
                {dictionary.footer.privacyPolicy}
              </Link>
              .
            </p>
          </div>

          {/* ขอบเขตการใช้งาน */}
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'ขอบเขตการใช้งาน' : 'Scope of Use'}
            </h2>
            <p>
              {lang === 'th'
                ? 'ห้ามใช้งานเพื่อวัตถุประสงค์ที่ผิดกฎหมาย หรือรบกวนระบบของเว็บไซต์'
                : 'You may not use the site for unlawful purposes or to disrupt the site or its systems.'}
            </p>
          </div>

          {/* ข้อจำกัดความรับผิดชอบ */}
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'ข้อจำกัดความรับผิดชอบ' : 'Limitation of Liability'}
            </h2>
            <p>
              {lang === 'th'
                ? 'เนื้อหาทั้งหมดจัดทำขึ้นเพื่อส่งเสริมความรู้เท่านั้น ไม่ใช่คำแนะนำทางการแพทย์ สุขภาพจิต หรือทางกฎหมาย โปรดปรึกษาผู้เชี่ยวชาญก่อนการตัดสินใจใดๆ'
                : 'All content is provided for general knowledge only. It is not medical, mental health, or legal advice. Please consult a qualified professional before making any decisions.'}
            </p>
          </div>

          {/* ลิขสิทธิ์และการเผยแพร่ (CC BY 4.0) + ตัวระบบ */}
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'ลิขสิทธิ์และการเผยแพร่ (Creative Commons BY 4.0)' : 'Copyright & Sharing (Creative Commons BY 4.0)'}
            </h2>
            <p>
              {lang === 'th'
                ? 'เราสนับสนุนการแบ่งปันความรู้ เนื้อหาประเภท "ตัวอักษรและบทความ" อยู่ภายใต้สัญญาอนุญาต CC BY 4.0'
                : 'We support sharing knowledge. “Text and article” content is licensed under CC BY 4.0.'}
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-zen-text/70">
              <li>
                {lang === 'th'
                  ? 'คุณสามารถ: แชร์, ทำซ้ำ, ดัดแปลง และใช้เพื่อการค้าได้'
                  : 'You may: share, reproduce, adapt, and use commercially.'}
              </li>
              <li>
                {lang === 'th'
                  ? 'เงื่อนไข: ต้องให้เครดิต (Attribution) โดยระบุชื่อ Serene Mind และทำลิงก์กลับมายังบทความต้นฉบับ พร้อมระบุหากมีการแก้ไข'
                  : 'Condition: you must give attribution (Serene Mind and link to the original article) and indicate if you modified the content.'}
              </li>
            </ul>
            <p className="mt-4 text-sm text-zen-text/70">
              {lang === 'th' ? 'ดูรายละเอียดสัญญาอนุญาต:' : 'License details:'}{' '}
              <a
                className="text-zen-accent hover:underline"
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY 4.0
              </a>
            </p>
            <div className="mt-4 p-4 bg-zen-bg rounded-xl border border-stone-200">
              <p className="text-xs text-zen-text/70 leading-relaxed">
                {lang === 'th'
                  ? 'ข้อยกเว้น: โลโก้ เครื่องหมายการค้า หรือดีไซน์ของเว็บไซต์ ยังคงเป็นสิทธิ์ของ Serene Mind เพียงผู้เดียว ห้ามนำไปใช้แอบอ้างหรือทำให้เข้าใจผิดว่าเป็นเจ้าของ'
                  : 'Exception: the logo, trademarks, and website design remain the exclusive rights of Serene Mind. You may not use them to imply endorsement or ownership.'}
              </p>
            </div>
            <div className="mt-3 p-4 bg-zen-bg rounded-xl border border-stone-200">
              <p className="text-xs text-zen-text/70 leading-relaxed">
                {lang === 'th'
                  ? 'สื่อจากบุคคลที่สาม (เช่น รูปภาพจาก Unsplash) จะขึ้นอยู่กับข้อกำหนดของเจ้าของสื่อนั้นๆ กรุณาตรวจสอบใบอนุญาตก่อนนำไปใช้ต่อ'
                  : 'Third-party media (e.g., images from Unsplash) are subject to their owners’ terms. Please verify the license before reusing.'}
              </p>
            </div>
          </div>

          {/* การเชื่อมโยงและลิงก์แนะนำ (Affiliate) */}
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'การเชื่อมโยงและลิงก์แนะนำ (Affiliate)' : 'Affiliate Links'}
            </h2>
            <p>
              {lang === 'th'
                ? 'เว็บไซต์อาจมีการแสดงลิงก์แนะนำสินค้า (Affiliate Links) ซึ่งเราอาจได้รับค่าตอบแทนโดยไม่มีค่าใช้จ่ายเพิ่มเติมกับคุณ เราคัดสรรสิ่งที่ดีที่สุด แต่การตัดสินใจซื้อเป็นความรับผิดชอบของคุณเอง'
                : 'The site may display affiliate links. We may receive compensation at no extra cost to you. We curate responsibly, but purchase decisions are your own.'}
            </p>
          </div>

          {/* การปฏิเสธความรับผิด (Disclaimer of Warranties) */}
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'การปฏิเสธความรับผิด (Disclaimer of Warranties)' : 'Disclaimer of Warranties'}
            </h2>
            <p>
              {lang === 'th'
                ? 'เราไม่รับประกันว่าเว็บไซต์จะทำงานโดยไม่มีข้อบกพร่อง และจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการใช้งานเว็บไซต์ตามขอบเขตที่กฎหมายอนุญาต'
                : 'We do not warrant that the site will operate without defects. We disclaim liability for damages arising from use of the site to the extent permitted by law.'}
            </p>
          </div>

          {/* Indemnification */}
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'การชดใช้ค่าเสียหาย (Indemnification)' : 'Indemnification'}
            </h2>
            <p>
              {lang === 'th'
                ? 'คุณตกลงว่าจะไม่ฟ้องร้องหรือเรียกร้องความรับผิดจาก Serene Mind หากเกิดความเสียหายจากการนำเนื้อหาไปใช้ผิดวิธี หรือใช้โดยปราศจากความระมัดระวังตามสมควร'
                : 'You agree not to hold Serene Mind liable for damages arising from misuse of the content or from use without due care.'}
            </p>
          </div>

          {/* การเปลี่ยนแปลงข้อกำหนด */}
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'การเปลี่ยนแปลงข้อกำหนด' : 'Changes'}
            </h2>
            <p>
              {lang === 'th'
                ? 'เราอาจปรับปรุงข้อกำหนดนี้เป็นครั้งคราว โดยจะอัปเดตวันที่ "ปรับปรุงล่าสุดเมื่อ" ในหน้านี้'
                : 'We may update these terms from time to time. The “Last updated” date on this page will reflect changes.'}
            </p>
          </div>

          {/* การติดต่อ */}
          <div>
            <h2 className="font-serif text-2xl text-zen-text mb-3 font-normal">
              {lang === 'th' ? 'การติดต่อ' : 'Contact'}
            </h2>
            <p>
              {lang === 'th' ? 'หากมีข้อสงสัย ติดต่อได้ที่:' : 'If you have questions, contact:'}{' '}
              <a className="text-zen-accent hover:underline font-medium" href="mailto:contact@serenemind.blog">
                contact@serenemind.blog
              </a>
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
