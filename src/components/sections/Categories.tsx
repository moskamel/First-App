'use client'

import React, { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useInView } from '@/hooks/useInView'

interface Category {
  icon: string
  name: string
  count: string
  color: string
}

interface CategoriesData {
  sectionBadge?: string
  sectionTitle?: string
  categories?: Category[]
}

interface CategoriesProps {
  data: CategoriesData
}

const fallbackCategories: Category[] = [
  { icon: '📱', name: 'الإلكترونيات', count: '1,200+ منتج', color: '#F58762' },
  { icon: '👗', name: 'الأزياء', count: '3,500+ منتج', color: '#C95FA0' },
  { icon: '🏠', name: 'المنزل والمطبخ', count: '2,100+ منتج', color: '#432467' },
  { icon: '💄', name: 'الجمال والعناية', count: '890+ منتج', color: '#F58762' },
  { icon: '📚', name: 'الكتب والتعليم', count: '4,000+ منتج', color: '#C95FA0' },
  { icon: '🏋️', name: 'الرياضة', count: '750+ منتج', color: '#432467' },
  { icon: '🎮', name: 'الألعاب', count: '600+ منتج', color: '#F58762' },
  { icon: '🍕', name: 'الطعام والشراب', count: '1,800+ منتج', color: '#C95FA0' },
]

const filterChips = ['الكل', 'الأكثر مبيعاً', 'الأعلى تقييماً', 'الأقل سعراً']

export default function Categories({ data }: CategoriesProps) {
  const categories = (data.categories as Category[] | undefined)?.length
    ? (data.categories as Category[])
    : fallbackCategories
  const [activeFilter, setActiveFilter] = useState(0)
  const { ref, inView } = useInView(0.1)

  return (
    <section id="categories" className="section-padding" dir="rtl" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={data.sectionBadge}
          title={data.sectionTitle ?? 'استكشف التصنيفات'}
        />

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterChips.map((chip, i) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(i)}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 font-arabic"
              style={{
                background: activeFilter === i
                  ? 'linear-gradient(135deg, #F58762, #C95FA0)'
                  : 'white',
                color: activeFilter === i ? 'white' : '#3d2460',
                border: activeFilter === i ? 'none' : '1.5px solid #e8daf4',
                boxShadow: activeFilter === i ? '0 4px 14px rgba(201,95,160,0.3)' : 'none',
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl border-2 p-6 text-center cursor-pointer overflow-hidden"
              style={{
                borderColor: 'transparent',
                transition: `all 0.5s ease ${i * 80}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                boxShadow: '0 2px 12px rgba(67,36,103,0.06)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = cat.color
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = `0 16px 32px ${cat.color}30`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = 'transparent'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 2px 12px rgba(67,36,103,0.06)'
              }}
            >
              {/* Gradient bg on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${cat.color}15, ${cat.color}05)` }}
              />

              <div className="relative text-4xl mb-3">{cat.icon}</div>
              <div className="relative text-base font-bold text-[#1a0a2e] mb-1 font-arabic">{cat.name}</div>
              <div className="relative text-xs text-[#8b7aaa] font-arabic">{cat.count}</div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="flex justify-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#e8daf4]
                       text-[#3d2460] font-bold hover:border-[#C95FA0] hover:text-[#C95FA0]
                       transition-all duration-200 font-arabic"
          >
            استعراض جميع التصنيفات
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
