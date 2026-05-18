import React from 'react'
import SectionHeader from '@/components/ui/SectionHeader'

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

export default function Categories({ data }: CategoriesProps) {
  const categories = data.categories ?? []

  return (
    <section id="categories" className="section-padding" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={data.sectionBadge}
          title={data.sectionTitle ?? 'التصنيفات'}
        />

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['الكل', 'الأكثر مبيعاً', 'الأعلى تقييماً', 'الأقل سعراً'].map((chip, i) => (
            <button
              key={chip}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-150 ${
                i === 0
                  ? 'bg-ink text-white'
                  : 'bg-surface-card text-ink border border-hairline hover:bg-surface-soft'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <a
              key={i}
              href="#"
              className="group relative bg-surface-card border border-hairline rounded-pin p-6 text-right
                         hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out
                         flex flex-col items-end cursor-pointer overflow-hidden"
            >
              {/* Background color accent */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-pin"
                style={{ background: cat.color }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-pin flex items-center justify-center text-3xl mb-4 transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${cat.color}18` }}
              >
                {cat.icon}
              </div>

              {/* Name */}
              <h3 className="text-base font-bold text-ink mb-1 font-arabic text-right">
                {cat.name}
              </h3>

              {/* Count */}
              <p className="text-sm font-medium font-arabic" style={{ color: cat.color }}>
                {cat.count}
              </p>

              {/* Arrow */}
              <div
                className="absolute top-4 left-4 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                style={{ background: `${cat.color}20` }}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke={cat.color}
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* View all button */}
        <div className="flex justify-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-pin border-2 border-hairline
                       text-ink-soft font-bold hover:border-primary hover:text-primary
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
