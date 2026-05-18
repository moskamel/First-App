'use client'

import React, { useEffect, useState } from 'react'
import { useInView } from '@/hooks/useInView'

interface Stat {
  value: string
  label: string
  icon: string
}

interface StatsData {
  stats?: Stat[]
}

interface StatsProps {
  data: StatsData
}

const fallbackStats: Stat[] = [
  { icon: '👥', value: '50,000+', label: 'مستخدم نشط' },
  { icon: '⭐', value: '4.8★', label: 'تقييم المتجر' },
  { icon: '🏪', value: '50+', label: 'متجر مدعوم' },
  { icon: '💰', value: '35%', label: 'متوسط التوفير' },
]

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const num = parseFloat(value.replace(/[^0-9.]/g, ''))
    const suffix = value.replace(/[0-9.,]/g, '').trim()
    if (isNaN(num)) {
      setDisplay(value)
      return
    }
    const duration = 2000
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * num)
      if (num >= 1000) {
        setDisplay(current.toLocaleString('ar-EG') + suffix)
      } else {
        setDisplay(current + suffix)
      }
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplay(value)
      }
    }
    requestAnimationFrame(animate)
  }, [inView, value])

  return <span>{display}</span>
}

export default function Stats({ data }: StatsProps) {
  const stats = (data.stats as Stat[] | undefined)?.length ? (data.stats as Stat[]) : fallbackStats
  const { ref, inView } = useInView(0.1)

  return (
    <section
      className="relative overflow-hidden"
      dir="rtl"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ background: 'linear-gradient(135deg, #432467 0%, #C95FA0 50%, #F58762 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/10" />
        <div className="absolute top-8 left-1/4 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute bottom-8 right-1/4 w-24 h-24 rounded-full bg-white/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p
            className="text-white/80 text-lg font-arabic font-medium"
            style={{
              transition: 'all 0.6s ease',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            أرقام تتحدث عن نفسها
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center"
              style={{
                transition: `all 0.6s ease ${i * 150}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
              }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div
                className="text-4xl md:text-5xl font-black text-white mb-2 font-arabic"
                style={{ lineHeight: 1.1 }}
              >
                <AnimatedNumber value={stat.value} inView={inView} />
              </div>
              <div className="text-white/70 font-medium text-sm font-arabic">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
