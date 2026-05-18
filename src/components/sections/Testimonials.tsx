'use client'

import React, { useRef } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'

interface Testimonial {
  name: string
  role: string
  avatar: string
  rating: number
  text: string
  location: string
}

interface TestimonialsData {
  sectionBadge?: string
  sectionTitle?: string
  testimonials?: Testimonial[]
}

interface TestimonialsProps {
  data: TestimonialsData
}

const fallbackTestimonials: Testimonial[] = [
  {
    name: 'سارة العتيبي',
    role: 'مدوّنة تقنية',
    avatar: 'س',
    rating: 5,
    text: 'ريفيوز غيّر طريقة تسوقي تماماً! الآن أقارن الأسعار قبل أي شراء وأوفّر الكثير.',
    location: 'الرياض، السعودية',
  },
  {
    name: 'محمد الحربي',
    role: 'مهندس برمجيات',
    avatar: 'م',
    rating: 5,
    text: 'خاصية المسح بالكاميرا رائعة جداً. فقط وجّهت الكاميرا للمنتج وحصلت على كل المعلومات فوراً.',
    location: 'جدة، السعودية',
  },
  {
    name: 'نورة القحطاني',
    role: 'ربة منزل',
    avatar: 'ن',
    rating: 5,
    text: 'التطبيق سهّل علي الحياة كثيراً. أجد أفضل الأسعار دون الحاجة للبحث في عشرات المتاجر.',
    location: 'الدمام، السعودية',
  },
  {
    name: 'خالد المنصور',
    role: 'رائد أعمال',
    avatar: 'خ',
    rating: 5,
    text: 'نظام نقاط المكافآت ممتع جداً. أكتب مراجعات وأكسب نقاطاً يمكن استخدامها لاحقاً.',
    location: 'أبوظبي، الإمارات',
  },
  {
    name: 'فاطمة الزهراني',
    role: 'طالبة جامعية',
    avatar: 'ف',
    rating: 5,
    text: 'كطالبة بميزانية محدودة، ريفيوز يساعدني دائماً في إيجاد أفضل صفقة ممكنة.',
    location: 'القاهرة، مصر',
  },
  {
    name: 'عمر السيد',
    role: 'مصوّر محترف',
    avatar: 'ع',
    rating: 5,
    text: 'ممتاز لمقارنة أسعار المعدات التقنية. وفّرت مئات الريالات على آخر كاميرا اشتريتها.',
    location: 'الكويت',
  },
  {
    name: 'ليلى حسن',
    role: 'معلّمة',
    avatar: 'ل',
    rating: 5,
    text: 'أنصح به كل من يريد أن يتسوق بذكاء. المقارنة السريعة بين المتاجر توفّر الوقت والمال.',
    location: 'عمّان، الأردن',
  },
  {
    name: 'أحمد الشمري',
    role: 'محاسب',
    avatar: 'أ',
    rating: 5,
    text: 'واجهة التطبيق جميلة وسهلة الاستخدام. أحب كيف يعرض مقارنة الأسعار بشكل واضح.',
    location: 'الكويت',
  },
]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      style={{
        minWidth: '320px',
        maxWidth: '320px',
        background: 'white',
        borderRadius: '20px',
        border: '1px solid #e8daf4',
        padding: '24px',
        boxShadow: '0 2px 16px rgba(67,36,103,0.06)',
        flexShrink: 0,
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: t.rating }).map((_, j) => (
          <span key={j} style={{ color: '#f59e0b', fontSize: '16px' }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          color: '#3d2460',
          fontSize: '14px',
          lineHeight: 1.85,
          marginBottom: '16px',
          textAlign: 'right',
          fontFamily: 'inherit',
        }}
      >
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F58762, #C95FA0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 900,
            fontSize: '16px',
            flexShrink: 0,
          }}
        >
          {t.avatar}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700, color: '#1a0a2e', fontSize: '13px' }}>{t.name}</div>
          <div style={{ color: '#8b7aaa', fontSize: '11px' }}>{t.role} · {t.location}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials({ data }: TestimonialsProps) {
  const testimonials = (data.testimonials as Testimonial[] | undefined)?.length
    ? (data.testimonials as Testimonial[])
    : fallbackTestimonials

  // Duplicate for seamless loop
  const row1 = [...testimonials, ...testimonials]
  const row2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()]

  return (
    <section
      id="testimonials"
      className="section-padding"
      dir="rtl"
      style={{ overflow: 'hidden' }}
    >
      <style>{`
        @keyframes marqueeRtl {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeLtr {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-track-rtl {
          animation: marqueeRtl 30s linear infinite;
          will-change: transform;
        }
        .marquee-track-ltr {
          animation: marqueeLtr 36s linear infinite;
          will-change: transform;
        }
        .marquee-wrap:hover .marquee-track-rtl,
        .marquee-wrap:hover .marquee-track-ltr {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={data.sectionBadge}
          title={data.sectionTitle ?? 'آراء المستخدمين'}
        />
      </div>

      {/* Row 1 — right to left */}
      <div className="marquee-wrap" style={{ marginBottom: '20px' }}>
        <div
          className="marquee-track-rtl"
          style={{ display: 'flex', gap: '20px', width: 'max-content' }}
        >
          {row1.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — left to right */}
      <div className="marquee-wrap">
        <div
          className="marquee-track-ltr"
          style={{ display: 'flex', gap: '20px', width: 'max-content' }}
        >
          {row2.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Trust indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {[
            { icon: '✅', label: 'مراجعات حقيقية ومعتمدة' },
            { icon: '🔒', label: 'بياناتك آمنة ومحمية' },
            { icon: '🌍', label: 'مستخدمون من كل أنحاء العالم العربي' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[#8b7aaa] font-arabic text-sm">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
