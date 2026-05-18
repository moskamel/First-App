import React from 'react'

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

export default function Stats({ data }: StatsProps) {
  const stats = data.stats ?? []

  return (
    <section className="relative overflow-hidden py-20" dir="rtl">
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #432467 0%, #C95FA0 50%, #F58762 100%)',
        }}
      />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/30"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-white/80 text-lg font-arabic font-medium">
            أرقام تتحدث عن نفسها
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center group"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-pin-lg bg-white/20 flex items-center justify-center text-3xl mx-auto mb-4
                           group-hover:bg-white/30 transition-all duration-200 group-hover:scale-110"
              >
                {stat.icon}
              </div>

              {/* Value */}
              <div
                className="text-4xl lg:text-5xl font-black text-white mb-2 font-arabic"
                style={{ lineHeight: 1.1 }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <p className="text-white/80 font-medium font-arabic text-sm lg:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
