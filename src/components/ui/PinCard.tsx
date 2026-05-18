import React from 'react'
import clsx from 'clsx'

interface PinCardProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'large'
  tag?: string
  tagColor?: string
  noPadding?: boolean
}

export default function PinCard({
  children,
  className,
  size = 'default',
  tag,
  tagColor,
  noPadding = false,
}: PinCardProps) {
  return (
    <div
      className={clsx(
        'relative bg-surface-card border border-hairline',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-deep/10',
        size === 'large' ? 'rounded-pin-lg' : 'rounded-pin',
        !noPadding && 'p-6',
        className,
      )}
    >
      {tag && (
        <span
          className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{
            background: tagColor ?? 'linear-gradient(135deg, #F58762, #C95FA0)',
          }}
        >
          {tag}
        </span>
      )}
      {children}
    </div>
  )
}
