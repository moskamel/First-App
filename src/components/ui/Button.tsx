'use client'

import React from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost' | 'pill'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  children: React.ReactNode
  className?: string
  as?: 'button' | 'a'
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses: Record<Variant, string> = {
  primary: [
    'text-white font-bold',
    'bg-gradient-to-l from-[#F58762] via-[#C95FA0] to-[#432467]',
    'hover:opacity-90 hover:shadow-lg hover:shadow-primary/30',
    'active:opacity-95 active:scale-[0.98]',
    'rounded-pin',
    'transition-all duration-200',
  ].join(' '),
  secondary: [
    'bg-surface-card text-ink font-bold',
    'border border-hairline',
    'hover:bg-white hover:border-primary/40 hover:shadow-sm',
    'active:bg-surface-soft active:scale-[0.98]',
    'rounded-pin',
    'transition-all duration-200',
  ].join(' '),
  ghost: [
    'bg-transparent text-ink font-semibold',
    'hover:bg-surface-card',
    'active:bg-surface-soft active:scale-[0.98]',
    'rounded-pin',
    'transition-all duration-200',
  ].join(' '),
  pill: [
    'text-white font-bold',
    'bg-gradient-to-l from-[#F58762] via-[#C95FA0] to-[#432467]',
    'hover:opacity-90 hover:shadow-lg hover:shadow-primary/30',
    'active:opacity-95 active:scale-[0.98]',
    'rounded-full',
    'transition-all duration-200',
  ].join(' '),
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  as,
  ...props
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 font-arabic',
    'cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-primary',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (href || as === 'a') {
    return (
      <a href={href ?? '#'} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
