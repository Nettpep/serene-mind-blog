'use client'

import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface DharmaQuote {
    text: string;
    author?: string;
}

// Curated collection of Thai dharma quotes
const DHARMA_QUOTES: DharmaQuote[] = [
    { text: "เมื่อสิ่งนี้มี สิ่งนี้ย่อมมี เพราะความเกิดขึ้นแห่งสิ่งนี้ สิ่งนี้จึงเกิดขึ้น", author: "พระพุทธเจ้า" },
    { text: "จิตเป็นนายของกาย กายเป็นบ่าวของจิต ถ้าจิตไม่ตั้งใจ กายก็หมดค่า", author: "พระพุทธเจ้า" },
    { text: "ความทุกข์มิใช่สิ่งที่เกิดจากภายนอก แต่เกิดจากความยึดมั่นถือมั่นภายในจิตใจ" },
    { text: "สติคือแสงสว่างที่ทำให้เห็นความจริง ไม่ใช่การหลบหนีความจริง" },
    { text: "ความเห็นแก่ตัวคือรากเหง้าแห่งทุกข์ ความเห็นแก่คนอื่นคือรากเหง้าแห่งสุข" },
    { text: "อดีตปล่อยไว้ อนาคตยังไม่มา ปัจจุบันคือสิ่งเดียวที่เรามี", author: "พระพุทธเจ้า" },
    { text: "ความโกรธคือถ่านเพลิงร้อนที่เราถือไว้เพื่อจะขว้างใส่คนอื่น แต่ใครเป็นคนถูกไหม้?", author: "พระพุทธเจ้า" },
    { text: "หยดน้ำแต่ละหยดเมื่อรวมกัน ก็เต็มภาชนะได้ ความดีเล็กน้อยที่สั่งสม ก็ทำให้ชีวิตเต็มเปี่ยมได้" },
    { text: "ผู้รู้จักพอ ย่อมพอ ผู้ไม่รู้จักพอ ไม่มีวันพอ", author: "แนวพุทธ" },
    { text: "สมาธิคือการหยุดนิ่งของใจ ปัญญาคือการเห็นแจ้งของใจ" },
    { text: "อย่าดูถูกความชั่วเล็กน้อยว่าไม่เป็นภัย ไฟป่าเริ่มต้นจากประกายไฟเล็กๆ" },
    { text: "ความสุขไม่ได้อยู่ที่การมีมาก แต่อยู่ที่การต้องการน้อย" },
    { text: "ทุกข์ก็ดี สุขก็ดี ล้วนเป็นเพียงกระแสที่ผ่านไป อย่ายึดติดกับสิ่งใด" },
    { text: "การให้อภัยไม่ได้เปลี่ยนอดีต แต่เปลี่ยนอนาคตของเรา" },
    { text: "สิ่งที่เราคิด เราจะกลายเป็น สิ่งที่เรารู้สึก เราจะดึงดูด สิ่งที่เราจินตนาการ เราจะสร้าง", author: "พระพุทธเจ้า" },
    { text: "ไม่มีทางสู่ความสุข ความสุขคือทาง", author: "พระพุทธเจ้า" },
    { text: "คำพูดที่มีสติ ย่อมดีกว่าความเงียบที่ไม่มีสติ" },
    { text: "วันนี้เป็นของขวัญ เพราะฉะนั้นจึงเรียกว่า ปัจจุบัน (Present)" },
    { text: "ปัญญาเกิดจากการพิจารณาให้เห็นสิ่งต่างๆ ตามความเป็นจริง" },
    { text: "ความรักที่แท้ต้องปราศจากความยึดมั่นถือมั่น" },
    { text: "ความว่างเปล่าไม่ได้หมายถึงความไม่มีอะไร แต่หมายถึงการปราศจากการยึดติด" },
    { text: "ผู้มีสติมั่นคงดุจเสาหิน ไม่หวั่นไหวไปกับคำชมหรือคำติ", author: "พระพุทธเจ้า" },
    { text: "เราไม่สามารถหยุดคลื่นได้ แต่เราสามารถเรียนรู้ที่จะโต้คลื่นได้" },
    { text: "ความเปลี่ยนแปลงเป็นปกติของชีวิต การยึดติดกับสิ่งที่ไม่เที่ยงคือความทุกข์" },
    { text: "ทุกอย่างเป็นครู ทุกที่เป็นห้องเรียน ทุกคนเป็นเพื่อนร่วมทาง" },
    { text: "สงบใจก่อน แล้วจะเห็นทางออก" },
    { text: "อย่าเชื่อสิ่งใดเพียงเพราะคนอื่นเชื่อ จงพิสูจน์ด้วยตัวเอง", author: "พระพุทธเจ้า" },
    { text: "วิปัสสนาคือการมองเห็นสิ่งต่างๆ ตามความเป็นจริง ไม่ใช่ตามที่เราต้องการ" },
    { text: "ปล่อยวางไม่ได้หมายความว่าทิ้ง แต่หมายความว่าไม่ยึด" },
    { text: "ความเมตตาต่อตนเองคือจุดเริ่มต้นของความเมตตาต่อผู้อื่น" },
    { text: "เหตุดี ผลดี เหตุชั่ว ผลชั่ว กรรมย่อมตามสนอง", author: "กฎแห่งกรรม" },
    { text: "การปฏิบัติธรรมไม่ได้อยู่ที่ความสมบูรณ์แบบ แต่อยู่ที่ความต่อเนื่อง" },
    { text: "ใจที่สงบคือพลังที่ยิ่งใหญ่ที่สุด" },
    { text: "ความทุกข์เกิดจากความต้องการ ความสุขเกิดจากความพอเพียง" },
    { text: "ลมหายใจคือสะพานเชื่อมระหว่างกายกับจิต" },
    { text: "ผู้ชนะตัวเอง ชนะทุกสิ่ง", author: "พระพุทธเจ้า" },
    { text: "การอยู่กับปัจจุบันคือของขวัญที่ยิ่งใหญ่ที่สุด" },
    { text: "ธรรมะไม่ได้อยู่ในหนังสือ แต่อยู่ในการปฏิบัติ" },
    { text: "ความเรียบง่ายนำมาซึ่งความสงบ" },
    { text: "หนทางสู่ความตรัสรู้คือการรู้จักตนเอง" },
    { text: "ความสุขที่แท้จริงไม่ได้มาจากภายนอก แต่มาจากภายใน" },
    { text: "การฝึกสติคือการฝึกตื่นอยู่ในชีวิต" },
    { text: "ปัญญาไม่ได้มาจากอายุ แต่มาจากประสบการณ์และการไตร่ตรอง" },
    { text: "ใจที่ไม่มีเมตตาดุจแผ่นดินแห้งแล้ง" },
    { text: "ความอดทนคือพลังที่ทำลายอุปสรรคทุกอย่างได้" },
    { text: "ผู้รู้พูดน้อย ผู้พูดมากมักไม่รู้", author: "แนวเต๋า" },
    { text: "ทุกก้าวคือการเดินทาง ไม่ใช่เป้าหมาย" },
    { text: "ความสงบเริ่มต้นด้วยการยอมรับสิ่งที่เป็น" },
    { text: "ดอกบัวงอกงามในโคลน เช่นเดียวกับปัญญาที่เกิดจากความทุกข์" },
    { text: "ผู้ฟังอย่างตั้งใจจะได้รับมากกว่าผู้พูด" },
];

const DailyQuote: React.FC = () => {
    const [quote, setQuote] = useState<DharmaQuote | null>(null);

    useEffect(() => {
        // Get quote based on day of year (0-364)
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const quoteIndex = dayOfYear % DHARMA_QUOTES.length;
        setQuote(DHARMA_QUOTES[quoteIndex]);
    }, []);

    if (!quote) return null;

    return (
        <div className="group relative overflow-hidden bg-white border border-stone-200 rounded-3xl shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-300/50 transition-all duration-500">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-zen-accent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-zen-accent rounded-full blur-3xl" />
            </div>

            <div className="relative p-10 md:p-16">
                {/* Header with Icon */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-zen-accent to-zen-accent" />
                    <div className="flex items-center gap-2.5 text-zen-accent">
                        <Sparkles size={20} strokeWidth={2.5} className="animate-pulse" />
                        <h3 className="text-xs uppercase tracking-[0.4em] font-bold">
                            ธรรมะประจำวัน
                        </h3>
                    </div>
                    <div className="w-10 h-[2px] bg-gradient-to-l from-transparent via-zen-accent to-zen-accent" />
                </div>

                {/* Quote Container */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Opening Quote Mark */}
                    <div className="absolute -top-4 -left-2 md:-left-8 text-6xl md:text-8xl font-serif text-zen-accent/20 leading-none select-none pointer-events-none">
                        "
                    </div>

                    {/* Quote Text */}
                    <blockquote className="relative px-4 md:px-8">
                        <p className="text-xl md:text-2xl lg:text-3xl font-serif text-zen-text leading-relaxed text-center mb-0 font-light">
                            {quote.text}
                        </p>
                    </blockquote>

                    {/* Closing Quote Mark */}
                    <div className="absolute -bottom-8 -right-2 md:-right-8 text-6xl md:text-8xl font-serif text-zen-accent/20 leading-none select-none pointer-events-none">
                        "
                    </div>
                </div>

                {/* Author */}
                {quote.author && (
                    <div className="mt-10 flex items-center justify-center gap-3">
                        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-zen-accent/40" />
                        <p className="text-sm md:text-base text-zen-muted font-light tracking-wide">
                            {quote.author}
                        </p>
                        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-zen-accent/40" />
                    </div>
                )}

                {/* Decorative Bottom Element */}
                <div className="mt-10 flex justify-center">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zen-accent/30 animate-pulse" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-zen-accent/50 animate-pulse" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-zen-accent/30 animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </div>

            {/* Subtle Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />
        </div>
    );
};

export default DailyQuote;
