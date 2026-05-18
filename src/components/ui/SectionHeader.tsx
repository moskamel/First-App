import React from 'react'
import Badge from './Badge'

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({
  badge,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-right'}`}>
      {badge && (
        <div className={`mb-4 ${centered ? 'flex justify-center' : 'flex justify-end'}`}>
          <Badge variant="soft">{badge}</Badge>
        </div>
      )}
      <h2
        className={`text-4xl md:text-5xl font-black leading-tight mb-4 font-arabic ${
          light ? 'text-white' : 'text-ink'
        }`}
        style={{ lineHeight: 1.2 }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg md:text-xl leading-relaxed max-w-2xl font-arabic ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-white/80' : 'text-ink-mute'}`}
          style={{ lineHeight: 1.8 }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
