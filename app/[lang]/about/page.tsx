import Link from 'next/link'
import { ArrowLeft, Heart, BookOpen, Lightbulb } from 'lucide-react'
import Image from 'next/image'
import { getDictionary } from '@/lib/get-dictionary'
import type { Locale } from '@/i18n-config'

interface PageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  
  return (
    <main className="pt-32 pb-20 min-h-screen relative bg-zen-bg">
      {/* Header */}
      <header className="container mx-auto px-6 mb-16 max-w-4xl">
        <Link 
          href={`/${lang}`} 
          className="inline-flex items-center text-zen-muted hover:text-zen-accent mb-10 transition-colors text-xs font-bold uppercase tracking-widest gap-2"
        >
          <ArrowLeft size={14} /> {dictionary.post.backToHome}
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-zen-text leading-[1.2] mb-8">
          {dictionary.nav.about}
        </h1>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100">
            <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-6 leading-[1.3]">
              {lang === 'th' ? 'ภารกิจของเรา' : 'Our Mission'}
            </h2>
            <p className="text-zen-text/80 text-lg leading-[1.8] mb-6 font-light italic text-center">
              {lang === 'th' 
                ? 'พื้นที่เล็ก ๆ สำหรับใจที่อยากสงบ และสมองที่อยากเข้าใจชีวิต'
                : 'A small space for hearts seeking peace and minds seeking to understand life'
              }
            </p>
            <p className="text-zen-text/80 text-lg leading-[1.8] mb-6 font-light">
              <strong className="font-medium text-zen-text">Serene Mind</strong> {lang === 'th' 
                ? 'เป็นพื้นที่สำหรับการตื่นรู้ เข้าใจตนเอง และเข้าใจโลกผ่านมุมมองของจิตวิทยาและพุทธธรรม'
                : 'is a space for awakening, understanding oneself, and understanding the world through the lens of psychology and Buddhist teachings'
              }
            </p>
            <p className="text-zen-text/80 text-lg leading-[1.8] font-light">
              {lang === 'th' 
                ? <>เราเชื่อว่า <strong className="font-medium text-zen-accent">"ความสงบ"</strong> เริ่มต้นจากการเข้าใจเหตุและผล ของทุกสิ่งที่เกิดขึ้นในใจเราเอง เมื่อเราเข้าใจกฎแห่งอิทัปปัจจยตา (ปฏิจจสมุปบาท) เราจะสามารถแยกแยะระหว่างสิ่งที่ควบคุมได้และควบคุมไม่ได้ และเลือกที่จะตอบสนองอย่างมีสติแทนการปฏิกิริยา</>
                : <>We believe that <strong className="font-medium text-zen-accent">"peace"</strong> begins with understanding the causes and conditions of everything that arises in our minds. When we understand the law of Idappaccayatā (Paṭiccasamuppāda), we can distinguish between what can and cannot be controlled, and choose to respond mindfully rather than react.</>
              }
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-8 text-center leading-[1.3]">
            {lang === 'th' ? 'ค่านิยมของเรา' : 'Our Values'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 bg-zen-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-zen-accent" size={32} />
              </div>
              <h3 className="font-serif text-xl text-zen-text mb-3 leading-[1.3]">
                {lang === 'th' ? 'ความเข้าใจ' : 'Understanding'}
              </h3>
              <p className="text-zen-text/70 text-sm leading-[1.7] font-light">
                {lang === 'th'
                  ? 'เราเชื่อในการเข้าใจตนเองและผู้อื่นอย่างลึกซึ้ง ผ่านการสังเกตและเรียนรู้'
                  : 'We believe in deep understanding of ourselves and others through observation and learning'
                }
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 bg-zen-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-zen-accent" size={32} />
              </div>
              <h3 className="font-serif text-xl text-zen-text mb-3 leading-[1.3]">
                {lang === 'th' ? 'ความรู้' : 'Knowledge'}
              </h3>
              <p className="text-zen-text/70 text-sm leading-[1.7] font-light">
                {lang === 'th'
                  ? 'เรามุ่งมั่นในการแบ่งปันความรู้ที่เป็นประโยชน์และนำไปใช้ได้จริงในชีวิตประจำวัน'
                  : 'We are committed to sharing useful knowledge that can be applied in daily life'
                }
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 bg-zen-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-zen-accent" size={32} />
              </div>
              <h3 className="font-serif text-xl text-zen-text mb-3 leading-[1.3]">
                {lang === 'th' ? 'การตื่นรู้' : 'Awareness'}
              </h3>
              <p className="text-zen-text/70 text-sm leading-[1.7] font-light">
                {lang === 'th'
                  ? 'เราเชื่อในการตื่นรู้และมีสติในทุกขณะ เพื่อสร้างชีวิตที่มีความหมาย'
                  : 'We believe in awakening and mindfulness in every moment to create a meaningful life'
                }
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-zen-accent/5 to-zen-accent/10 rounded-2xl p-8 md:p-12 border border-zen-accent/20">
            <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-6 leading-[1.3]">
              {lang === 'th' ? 'สิ่งที่เราเสนอ' : 'What We Offer'}
            </h2>
            <ul className="space-y-4 text-zen-text/80 text-lg leading-[1.8] font-light">
              <li className="flex items-start gap-3">
                <span className="text-zen-accent mt-1">•</span>
                <span>
                  <strong className="font-medium text-zen-text">
                    {lang === 'th' ? 'บทความคุณภาพ' : 'Quality Articles'}
                  </strong> {lang === 'th' 
                    ? 'เกี่ยวกับจิตวิทยา สมาธิ และกฎแห่งอิทัปปัจจยตา'
                    : 'about psychology, meditation, and the law of Idappaccayatā'
                  }
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zen-accent mt-1">•</span>
                <span>
                  <strong className="font-medium text-zen-text">
                    {lang === 'th' ? 'ความรู้ที่นำไปใช้ได้จริง' : 'Practical Knowledge'}
                  </strong> {lang === 'th'
                    ? 'เพื่อพัฒนาตนเองและสร้างความสงบในใจ'
                    : 'to develop yourself and create inner peace'
                  }
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zen-accent mt-1">•</span>
                <span>
                  <strong className="font-medium text-zen-text">
                    {lang === 'th' ? 'มุมมองที่หลากหลาย' : 'Diverse Perspectives'}
                  </strong> {lang === 'th'
                    ? 'ระหว่างวิทยาศาสตร์และจิตตปัญญา'
                    : 'between science and spirituality'
                  }
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zen-accent mt-1">•</span>
                <span>
                  <strong className="font-medium text-zen-text">
                    {lang === 'th' ? 'พื้นที่ปลอดภัย' : 'Safe Space'}
                  </strong> {lang === 'th'
                    ? 'สำหรับการสำรวจและเรียนรู้เกี่ยวกับตนเอง'
                    : 'for exploring and learning about yourself'
                  }
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100">
            <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-6 leading-[1.3]">
              {lang === 'th' ? 'วิสัยทัศน์' : 'Vision'}
            </h2>
            <p className="text-zen-text/80 text-lg leading-[1.8] mb-4 font-light">
              {lang === 'th'
                ? 'เราเชื่อว่าทุกคนสามารถเข้าถึงความสงบและความเข้าใจในตนเองได้ ไม่ว่าจะอยู่ที่ไหนหรือมีภูมิหลังอย่างไร'
                : 'We believe that everyone can access peace and self-understanding, regardless of where they are or their background'
              }
            </p>
            <p className="text-zen-text/80 text-lg leading-[1.8] font-light">
              {lang === 'th'
                ? 'เป้าหมายของเราคือการสร้างชุมชนแห่งการเรียนรู้ที่ทุกคนสามารถแบ่งปันประสบการณ์ และเติบโตไปด้วยกัน ผ่านการเข้าใจกฎแห่งธรรมชาติและความจริงของชีวิต'
                : 'Our goal is to create a learning community where everyone can share experiences and grow together through understanding the laws of nature and the truth of life'
              }
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-zen-bg rounded-2xl p-8 md:p-12 border border-stone-200 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-4 leading-[1.3]">
              {lang === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
            </h2>
            <p className="text-zen-text/70 text-lg mb-6 font-light">
              {lang === 'th' ? 'มีคำถามหรือข้อเสนอแนะ? เรายินดีรับฟัง' : 'Have questions or suggestions? We\'d love to hear from you'}
            </p>
            <p className="text-zen-text/60 font-light">
              {lang === 'th' ? 'อีเมล:' : 'Email:'} <a href="mailto:contact@serenemind.blog" className="text-zen-accent hover:underline">contact@serenemind.blog</a>
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}
