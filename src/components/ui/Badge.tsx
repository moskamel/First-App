import React from 'react'
import clsx from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gradient' | 'soft' | 'outline'
  className?: string
}

export default function Badge({ children, variant = 'soft', className }: BadgeProps) {
  const variantClasses = {
    gradient: 'text-white bg-gradient-to-l from-[#F58762] via-[#C95FA0] to-[#432467]',
    soft: 'text-primary-deep bg-surface-soft border border-hairline',
    outline: 'text-primary bg-transparent border border-primary/40',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold font-arabic',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
