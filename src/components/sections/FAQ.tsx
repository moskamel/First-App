'use client'

import React, { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useInView } from '@/hooks/useInView'

interface FAQ {
  question: string
  answer: string
}

interface FAQData {
  sectionBadge?: string
  sectionTitle?: string
  faqs?: FAQ[]
}

interface FAQProps {
  data: FAQData
}

const fallbackFaqs: FAQ[] = [
  {
    question: 'هل تطبيق ريفيوز مجاني؟',
    answer: 'نعم، ريفيوز مجاني تماماً للتحميل والاستخدام. يمكنك البحث عن المنتجات ومقارنة الأسعار وقراءة التقييمات دون أي رسوم.',
  },
  {
    question: 'كيف يعمل المسح بالكاميرا؟',
    answer: 'تقنية المسح بالكاميرا مدعومة بـ Google Gemini AI. فقط وجّه كاميرا هاتفك نحو أي منتج أو باركود، وسيتعرف التطبيق على المنتج فوراً ويعرض أسعاره من جميع المتاجر المدعومة.',
  },
  {
    question: 'ما المتاجر المدعومة في ريفيوز؟',
    answer: 'يدعم ريفيوز حالياً أكثر من 50 متجراً إلكترونياً بما فيها Amazon، Noon، Jumia، Jarir، Extra، Namshi، وغيرها الكثير. نضيف متاجر جديدة بشكل دوري.',
  },
  {
    question: 'كيف أكسب نقاط المكافآت؟',
    answer: 'اكسب نقاطاً عند كتابة مراجعات للمنتجات، رفع صور حقيقية، تقييم التقييمات المفيدة، ودعوة أصدقائك للانضمام. يمكن استخدام النقاط للحصول على مزايا حصرية.',
  },
  {
    question: 'هل التقييمات حقيقية وموثوقة؟',
    answer: 'نعم، نستخدم نظام تحقق متعدد الطبقات للتأكد من أن جميع التقييمات صادرة من مستخدمين حقيقيين اشتروا المنتج فعلاً. أي تقييم مشبوه يتم مراجعته وحذفه.',
  },
  {
    question: 'على أي أجهزة يعمل التطبيق؟',
    answer: 'ريفيوز متاح على iOS (iPhone/iPad) وAndroid. يتطلب iOS 14 أو أعلى، وAndroid 8.0 أو أعلى. يمكنك أيضاً تصفح الموقع الإلكتروني من أي متصفح.',
  },
]

function FAQItem({ faq, index, isOpen, onToggle }: { faq: FAQ; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: `1.5px solid ${isOpen ? '#C95FA0' : '#e8daf4'}`,
        transition: 'border-color 0.3s ease',
        boxShadow: isOpen ? '0 8px 32px rgba(201,95,160,0.1)' : '0 2px 12px rgba(67,36,103,0.04)',
      }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-right"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-bold text-[#1a0a2e] text-base font-arabic flex-1 text-right">{faq.question}</span>
        <span
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xl ms-4 transition-all duration-300 font-bold"
          style={{
            background: isOpen ? 'linear-gradient(135deg, #F58762, #C95FA0)' : '#f0e8ff',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            color: isOpen ? 'white' : '#8b7aaa',
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          className="px-5 pb-5 text-[#8b7aaa] font-arabic text-right"
          style={{ lineHeight: 1.9, fontSize: '0.9rem' }}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ({ data }: FAQProps) {
  const faqs = (data.faqs as FAQ[] | undefined)?.length ? (data.faqs as FAQ[]) : fallbackFaqs
  const [open, setOpen] = useState<number | null>(null)
  const { ref, inView } = useInView(0.1)

  return (
    <section id="faq" className="section-padding" dir="rtl" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={data.sectionBadge}
          title={data.sectionTitle ?? 'الأسئلة الشائعة'}
        />

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <FAQItem
                faq={faq}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </div>
          ))}
        </div>

        {/* Contact prompt */}
        <div className="mt-10 text-center">
          <p className="text-[#8b7aaa] font-arabic mb-3 text-sm">
            لم تجد إجابة سؤالك؟
          </p>
          <a
            href="mailto:hello@reviyoz.com"
            className="inline-flex items-center gap-2 font-bold font-arabic text-sm"
            style={{ color: '#C95FA0' }}
          >
            تواصل مع فريق الدعم
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
