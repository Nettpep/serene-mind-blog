import Link from 'next/link'
import { ArrowLeft, Heart, BookOpen, Lightbulb } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 min-h-screen relative bg-zen-bg">
      {/* Header */}
      <header className="container mx-auto px-6 mb-16 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center text-zen-muted hover:text-zen-accent mb-10 transition-colors text-xs font-bold uppercase tracking-widest gap-2"
        >
          <ArrowLeft size={14} /> กลับหน้าแรก
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-zen-text leading-[1.2] mb-8">
          เกี่ยวกับเรา
        </h1>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100">
            <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-6 leading-[1.3]">
              ภารกิจของเรา
            </h2>
            <p className="text-zen-text/80 text-lg leading-[1.8] mb-6 font-light">
              <strong className="font-medium text-zen-text">Idappaccayatā</strong> เป็นพื้นที่สำหรับการตื่นรู้ 
              เข้าใจตนเอง และเข้าใจโลกผ่านมุมมองของจิตวิทยาและพุทธธรรม
            </p>
            <p className="text-zen-text/80 text-lg leading-[1.8] font-light">
              เราเชื่อว่า <strong className="font-medium text-zen-accent">"ความสงบ"</strong> เริ่มต้นจากการเข้าใจเหตุและผล 
              ของทุกสิ่งที่เกิดขึ้นในใจเราเอง เมื่อเราเข้าใจกฎแห่งอิทัปปัจจยตา (ปฏิจจสมุปบาท) 
              เราจะสามารถแยกแยะระหว่างสิ่งที่ควบคุมได้และควบคุมไม่ได้ และเลือกที่จะตอบสนองอย่างมีสติแทนการปฏิกิริยา
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-8 text-center leading-[1.3]">
            ค่านิยมของเรา
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 bg-zen-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-zen-accent" size={32} />
              </div>
              <h3 className="font-serif text-xl text-zen-text mb-3 leading-[1.3]">ความเข้าใจ</h3>
              <p className="text-zen-text/70 text-sm leading-[1.7] font-light">
                เราเชื่อในการเข้าใจตนเองและผู้อื่นอย่างลึกซึ้ง ผ่านการสังเกตและเรียนรู้
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 bg-zen-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-zen-accent" size={32} />
              </div>
              <h3 className="font-serif text-xl text-zen-text mb-3 leading-[1.3]">ความรู้</h3>
              <p className="text-zen-text/70 text-sm leading-[1.7] font-light">
                เรามุ่งมั่นในการแบ่งปันความรู้ที่เป็นประโยชน์และนำไปใช้ได้จริงในชีวิตประจำวัน
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 bg-zen-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-zen-accent" size={32} />
              </div>
              <h3 className="font-serif text-xl text-zen-text mb-3 leading-[1.3]">การตื่นรู้</h3>
              <p className="text-zen-text/70 text-sm leading-[1.7] font-light">
                เราเชื่อในการตื่นรู้และมีสติในทุกขณะ เพื่อสร้างชีวิตที่มีความหมาย
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-zen-accent/5 to-zen-accent/10 rounded-2xl p-8 md:p-12 border border-zen-accent/20">
            <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-6 leading-[1.3]">
              สิ่งที่เราเสนอ
            </h2>
            <ul className="space-y-4 text-zen-text/80 text-lg leading-[1.8] font-light">
              <li className="flex items-start gap-3">
                <span className="text-zen-accent mt-1">•</span>
                <span><strong className="font-medium text-zen-text">บทความคุณภาพ</strong> เกี่ยวกับจิตวิทยา สมาธิ และกฎแห่งอิทัปปัจจยตา</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zen-accent mt-1">•</span>
                <span><strong className="font-medium text-zen-text">ความรู้ที่นำไปใช้ได้จริง</strong> เพื่อพัฒนาตนเองและสร้างความสงบในใจ</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zen-accent mt-1">•</span>
                <span><strong className="font-medium text-zen-text">มุมมองที่หลากหลาย</strong> ระหว่างวิทยาศาสตร์และจิตตปัญญา</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zen-accent mt-1">•</span>
                <span><strong className="font-medium text-zen-text">พื้นที่ปลอดภัย</strong> สำหรับการสำรวจและเรียนรู้เกี่ยวกับตนเอง</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100">
            <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-6 leading-[1.3]">
              วิสัยทัศน์
            </h2>
            <p className="text-zen-text/80 text-lg leading-[1.8] mb-4 font-light">
              เราเชื่อว่าทุกคนสามารถเข้าถึงความสงบและความเข้าใจในตนเองได้ 
              ไม่ว่าจะอยู่ที่ไหนหรือมีภูมิหลังอย่างไร
            </p>
            <p className="text-zen-text/80 text-lg leading-[1.8] font-light">
              เป้าหมายของเราคือการสร้างชุมชนแห่งการเรียนรู้ที่ทุกคนสามารถแบ่งปันประสบการณ์ 
              และเติบโตไปด้วยกัน ผ่านการเข้าใจกฎแห่งธรรมชาติและความจริงของชีวิต
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-zen-bg rounded-2xl p-8 md:p-12 border border-stone-200 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-zen-text mb-4 leading-[1.3]">
              ติดต่อเรา
            </h2>
            <p className="text-zen-text/70 text-lg mb-6 font-light">
              มีคำถามหรือข้อเสนอแนะ? เรายินดีรับฟัง
            </p>
            <p className="text-zen-text/60 font-light">
              อีเมล: <a href="mailto:contact@idappaccayata.com" className="text-zen-accent hover:underline">contact@idappaccayata.com</a>
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}
