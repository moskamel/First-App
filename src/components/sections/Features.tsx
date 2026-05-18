'use client'

import React from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useInView } from '@/hooks/useInView'

interface Feature {
  icon: string
  title: string
  description: string
  tag: string
}

interface FeaturesData {
  sectionBadge?: string
  sectionTitle?: string
  sectionDescription?: string
  features?: Feature[]
}

interface FeaturesProps {
  data: FeaturesData
}

const tagColors = [
  'linear-gradient(135deg, #F58762, #C95FA0)',
  'linear-gradient(135deg, #C95FA0, #432467)',
  'linear-gradient(135deg, #432467, #C95FA0)',
  'linear-gradient(135deg, #F58762, #432467)',
  'linear-gradient(135deg, #C95FA0, #F58762)',
  'linear-gradient(135deg, #432467, #F58762)',
]

const fallbackFeatures: Feature[] = [
  { icon: '🔍', title: 'البحث الذكي', description: 'ابحث عن أي منتج أو علامة تجارية أو متجر والحصول على نتائج فورية من قاعدة بيانات ضخمة', tag: 'فوري' },
  { icon: '📷', title: 'المسح بالكاميرا', description: 'وجّه كاميرتك نحو أي منتج واعرف كل شيء عنه في ثوانٍ — مدعوم بـ Google Gemini AI', tag: 'AI' },
  { icon: '💰', title: 'مقارنة الأسعار', description: 'اعرض أسعار أي منتج من جميع المتاجر المتاحة دفعةً واحدة مع رابط مباشر للشراء', tag: 'وفّر' },
  { icon: '⭐', title: 'تقييمات حقيقية', description: 'آراء موثوقة من مستخدمين حقيقيين مع نظام تقييم بالنجوم وعدد المراجعات', tag: 'موثوق' },
  { icon: '🎯', title: 'نقاط المكافآت', description: 'اكسب نقاطاً عند كتابة مراجعات، رفع الصور، والتفاعل. ارقَ في مستويات المستخدمين', tag: 'مكافآت' },
  { icon: '🏪', title: 'استعراض المتاجر', description: 'تصفّح Amazon، Noon، Jumia، Jarir، Extra وغيرها. صفحة تفصيلية لكل متجر', tag: 'متاجر' },
]

export default function Features({ data }: FeaturesProps) {
  const features = (data.features as Feature[] | undefined)?.length ? (data.features as Feature[]) : fallbackFeatures
  const { ref, inView } = useInView(0.1)

  return (
    <section id="features" className="section-padding bg-white/50" dir="rtl" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={data.sectionBadge}
          title={data.sectionTitle ?? 'كل ما تحتاجه في مكان واحد'}
          description={data.sectionDescription}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl border border-[#e8daf4] p-6 cursor-default overflow-hidden"
              style={{
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                boxShadow: '0 2px 16px rgba(67,36,103,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px rgba(201,95,160,0.18), 0 8px 16px rgba(245,135,98,0.12)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(67,36,103,0.06)'
              }}
            >
              {/* Gradient hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(245,135,98,0.05), rgba(201,95,160,0.05), rgba(67,36,103,0.05))' }}
              />

              {/* Icon circle */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 flex-shrink-0"
                style={{ background: tagColors[i % tagColors.length] }}
              >
                {feature.icon}
              </div>

              {/* Tag */}
              <span
                className="text-xs font-bold px-3 py-1 rounded-full text-white mb-3 inline-block"
                style={{ background: tagColors[i % tagColors.length] }}
              >
                {feature.tag}
              </span>

              <h3 className="text-lg font-bold text-[#1a0a2e] mb-2 font-arabic text-right">
                {feature.title}
              </h3>
              <p className="text-sm text-[#8b7aaa] leading-relaxed font-arabic text-right" style={{ lineHeight: 1.8 }}>
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 right-0 left-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: tagColors[i % tagColors.length] }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
