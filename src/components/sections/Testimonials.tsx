import React from 'react'
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

const avatarColors = [
  'linear-gradient(135deg, #F58762, #C95FA0)',
  'linear-gradient(135deg, #C95FA0, #432467)',
  'linear-gradient(135deg, #432467, #C95FA0)',
  'linear-gradient(135deg, #F58762, #432467)',
  'linear-gradient(135deg, #C95FA0, #F58762)',
  'linear-gradient(135deg, #432467, #F58762)',
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 flex-row-reverse justify-end">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-hairline'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials({ data }: TestimonialsProps) {
  const testimonials = data.testimonials ?? []

  return (
    <section id="testimonials" className="section-padding bg-white/40" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={data.sectionBadge}
          title={data.sectionTitle ?? 'آراء المستخدمين'}
        />

        {/* Masonry testimonials grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-surface-card border border-hairline rounded-pin p-6
                         hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-deep/10
                         transition-all duration-200 ease-out mb-6"
            >
              {/* Quote icon */}
              <div className="text-4xl text-primary/20 font-black mb-2 text-right leading-none">
                &ldquo;
              </div>

              {/* Text */}
              <p
                className="text-ink-soft text-right font-arabic mb-5 leading-[1.9]"
                style={{ lineHeight: 1.9 }}
              >
                {t.text}
              </p>

              {/* Stars */}
              <div className="mb-4">
                <StarRating rating={t.rating} />
              </div>

              {/* User info */}
              <div className="flex items-center gap-3 flex-row-reverse">
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{ background: avatarColors[i % avatarColors.length] }}
                >
                  {t.avatar}
                </div>

                {/* Name and role */}
                <div className="flex-1 text-right">
                  <div className="font-bold text-ink text-sm font-arabic">{t.name}</div>
                  <div className="text-xs text-ink-mute font-arabic">
                    {t.role} · {t.location}
                  </div>
                </div>

                {/* Verified badge */}
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
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
            <div key={i} className="flex items-center gap-2 text-ink-mute font-arabic text-sm">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
