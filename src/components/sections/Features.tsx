import React from 'react'
import PinCard from '@/components/ui/PinCard'
import SectionHeader from '@/components/ui/SectionHeader'

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

export default function Features({ data }: FeaturesProps) {
  const features = data.features ?? []

  return (
    <section id="features" className="section-padding bg-white/40" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={data.sectionBadge}
          title={data.sectionTitle ?? 'الميزات'}
          description={data.sectionDescription}
        />

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <PinCard
              key={i}
              className="group"
              size={i === 0 || i === 5 ? 'large' : 'default'}
            >
              {/* Tag pill */}
              <div className="flex justify-between items-start mb-4">
                <span
                  className="text-xs font-bold text-white px-3 py-1 rounded-full"
                  style={{ background: tagColors[i % tagColors.length] }}
                >
                  {feature.tag}
                </span>
                {/* Icon */}
                <span className="text-4xl">{feature.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-black text-ink mb-3 text-right font-arabic">
                {feature.title}
              </h3>
              <p
                className="text-ink-mute text-right font-arabic leading-relaxed"
                style={{ lineHeight: 1.8 }}
              >
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="mt-4 h-1 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-auto"
                style={{ background: tagColors[i % tagColors.length] }}
              />
            </PinCard>
          ))}
        </div>
      </div>
    </section>
  )
}
