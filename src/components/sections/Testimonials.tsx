'use client'

import React from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useInView } from '@/hooks/useInView'

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
]

export default function Testimonials({ data }: TestimonialsProps) {
  const testimonials = (data.testimonials as Testimonial[] | undefined)?.length
    ? (data.testimonials as Testimonial[])
    : fallbackTestimonials
  const { ref, inView } = useInView(0.05)

  return (
    <section
      id="testimonials"
      className="section-padding bg-white/50"
      dir="rtl"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={data.sectionBadge}
          title={data.sectionTitle ?? 'آراء المستخدمين'}
        />

        {/* Masonry columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-6 bg-white rounded-2xl border border-[#e8daf4] p-6"
              style={{
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                boxShadow: '0 2px 16px rgba(67,36,103,0.06)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-lg">★</span>
                ))}
              </div>

              {/* Quote text */}
              <p
                className="text-[#3d2460] text-base mb-5 font-arabic text-right font-medium"
                style={{ lineHeight: 1.9 }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #F58762, #C95FA0)' }}
                >
                  {t.avatar}
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#1a0a2e] text-sm font-arabic">{t.name}</div>
                  <div className="text-[#8b7aaa] text-xs font-arabic">{t.role} · {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
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
