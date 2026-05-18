import React from 'react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

interface HeroData {
  badge?: string
  title?: string
  titleHighlight?: string
  subtitle?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  appStoreUrl?: string
  playStoreUrl?: string
  stat1Value?: string
  stat1Label?: string
  stat2Value?: string
  stat2Label?: string
  stat3Value?: string
  stat3Label?: string
}

interface HeroProps {
  data: HeroData
}

const floatingCards = [
  { icon: '📱', label: 'مسح المنتج', sub: 'Google Gemini AI', delay: '0s', color: '#F58762' },
  { icon: '💰', label: 'أفضل سعر', sub: 'وفّر 35%', delay: '0.5s', color: '#C95FA0' },
  { icon: '⭐', label: 'تقييم 4.8', sub: 'من 10,000+ مستخدم', delay: '1s', color: '#432467' },
  { icon: '🏪', label: '50+ متجر', sub: 'Amazon, Noon, Jumia', delay: '1.5s', color: '#F58762' },
]

export default function Hero({ data }: HeroProps) {
  const title = data.title ?? 'اكتشف. قارن. اشترِ بذكاء.'
  const highlight = data.titleHighlight ?? 'بذكاء'

  const titleParts = title.split(highlight)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      dir="rtl"
    >
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#F58762]/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#432467]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C95FA0]/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content — right side in RTL */}
          <div className="text-right order-1 lg:order-1">
            {/* Badge */}
            {data.badge && (
              <div className="flex justify-end mb-6 animate-fade-in-up">
                <Badge variant="soft">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary ml-2 animate-pulse" />
                  {data.badge}
                </Badge>
              </div>
            )}

            {/* Main headline */}
            <h1
              className="font-black text-ink mb-4 animate-fade-in-up delay-100"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {titleParts[0]}
              <span className="gradient-text">{highlight}</span>
              {titleParts[1]}
            </h1>

            {/* Subtitle */}
            {data.subtitle && (
              <p
                className="text-xl md:text-2xl font-semibold text-primary-mid mb-6 animate-fade-in-up delay-200"
              >
                {data.subtitle}
              </p>
            )}

            {/* Description */}
            {data.description && (
              <p
                className="text-lg text-ink-mute mb-8 leading-[1.9] animate-fade-in-up delay-300"
              >
                {data.description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-end mb-8 animate-fade-in-up delay-400">
              <Button variant="primary" size="lg" href={data.appStoreUrl ?? '#'}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.42.07 2.38.74 3.2.8 1.18-.24 2.34-.93 3.6-.85 1.54.12 2.69.73 3.44 1.88-3.26 1.97-2.57 6.16.64 7.41-.66 1.9-1.5 3.73-2.88 5.62zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                {data.primaryCta ?? 'حمّل مجاناً'}
              </Button>
              <Button variant="secondary" size="lg" href="#features">
                {data.secondaryCta ?? 'استكشف المنتجات'}
              </Button>
            </div>

            {/* Store badges */}
            <div className="flex flex-wrap gap-3 justify-end mb-10 animate-fade-in-up delay-500">
              <a
                href={data.appStoreUrl ?? '#'}
                className="flex items-center gap-2 bg-ink text-white px-4 py-2.5 rounded-pin hover:bg-ink-soft transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.42.07 2.38.74 3.2.8 1.18-.24 2.34-.93 3.6-.85 1.54.12 2.69.73 3.44 1.88-3.26 1.97-2.57 6.16.64 7.41-.66 1.9-1.5 3.73-2.88 5.62zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-right">
                  <div className="text-xs opacity-70">متاح على</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
              <a
                href={data.playStoreUrl ?? '#'}
                className="flex items-center gap-2 bg-ink text-white px-4 py-2.5 rounded-pin hover:bg-ink-soft transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.18 23.76a2 2 0 01-.8-.78L12 13.3l2.65 2.65-11.47 7.81zM.15 1.13A2 2 0 000 2v20a2 2 0 00.15.87L12 11 .15 1.13zM20.6 10.03L17.7 8.38 14.7 11l3 3 3-1.65a2 2 0 000-2.32zM3.18.24l11.47 7.81L12 10.7 2.38 1.02A2 2 0 013.18.24z" />
                </svg>
                <div className="text-right">
                  <div className="text-xs opacity-70">متاح على</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-end animate-fade-in-up delay-600">
              {[
                { value: data.stat1Value, label: data.stat1Label },
                { value: data.stat2Value, label: data.stat2Label },
                { value: data.stat3Value, label: data.stat3Label },
              ].map((stat, i) => (
                <div key={i} className="text-right">
                  <div
                    className="text-2xl md:text-3xl font-black gradient-text"
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-ink-mute font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side — floating product cards */}
          <div className="relative order-2 lg:order-2 flex justify-center items-center min-h-[400px] lg:min-h-[500px]">
            {/* Main phone mockup area */}
            <div className="relative w-64 h-[500px] sm:w-72 sm:h-[560px]">
              {/* Phone shell */}
              <div
                className="absolute inset-0 rounded-[3rem] border-4 border-white/60 shadow-2xl shadow-primary-deep/20"
                style={{
                  background: 'linear-gradient(160deg, #FCDDD0 0%, #FDF8FF 50%, #E5D4F2 100%)',
                }}
              >
                {/* Phone screen content */}
                <div className="absolute inset-3 rounded-[2.5rem] overflow-hidden bg-white/80">
                  {/* App bar */}
                  <div className="gradient-bg p-3 flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-white/30" />
                    <span className="text-white font-black text-lg">ريفيوز</span>
                    <div className="w-6 h-6 rounded-full bg-white/30" />
                  </div>

                  {/* Search bar */}
                  <div className="p-3">
                    <div className="bg-surface-soft rounded-full px-4 py-2 flex items-center gap-2">
                      <span className="text-ink-mute text-sm">🔍</span>
                      <span className="text-ink-mute text-xs">ابحث عن أي منتج...</span>
                    </div>
                  </div>

                  {/* Product cards grid */}
                  <div className="px-3 grid grid-cols-2 gap-2">
                    {[
                      { name: 'آيفون 15', price: '2,999 ر.س', icon: '📱', discount: '-15%' },
                      { name: 'سماعات سوني', price: '599 ر.س', icon: '🎧', discount: '-22%' },
                      { name: 'لابتوب ديل', price: '3,499 ر.س', icon: '💻', discount: '-10%' },
                      { name: 'ساعة آبل', price: '1,499 ر.س', icon: '⌚', discount: '-8%' },
                    ].map((product, i) => (
                      <div
                        key={i}
                        className="bg-surface-card rounded-xl p-2 border border-hairline"
                      >
                        <div className="text-2xl mb-1 text-center">{product.icon}</div>
                        <div className="text-xs font-bold text-ink text-right">{product.name}</div>
                        <div className="text-xs text-primary font-black text-right">{product.price}</div>
                        <span className="text-[10px] bg-green-100 text-green-700 rounded-full px-1.5 py-0.5 font-bold">
                          {product.discount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phone notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-ink rounded-full" />
              </div>

              {/* Floating cards around phone */}
              {floatingCards.map((card, i) => {
                const positions = [
                  '-top-4 -right-16',
                  'top-1/4 -left-20',
                  'top-1/2 -right-20',
                  '-bottom-4 -left-16',
                ]
                return (
                  <div
                    key={i}
                    className={`absolute ${positions[i]} glass rounded-pin px-3 py-2 flex items-center gap-2 shadow-lg min-w-[140px]`}
                    style={{
                      animation: `floatAnimation 3s ease-in-out infinite`,
                      animationDelay: card.delay,
                    }}
                  >
                    <span className="text-xl">{card.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-ink">{card.label}</div>
                      <div className="text-[10px] text-ink-mute">{card.sub}</div>
                    </div>
                  </div>
                )
              })}

              {/* Decorative gradient ring */}
              <div
                className="absolute -inset-8 rounded-full opacity-20"
                style={{
                  background: 'conic-gradient(from 0deg, #F58762, #C95FA0, #432467, #F58762)',
                  filter: 'blur(20px)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 60V30C360 0 720 60 1080 30C1260 15 1380 25 1440 30V60H0Z"
            fill="rgba(253,248,255,0.5)"
          />
        </svg>
      </div>
    </section>
  )
}
