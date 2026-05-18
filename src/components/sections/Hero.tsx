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
  { icon: '📱', label: 'مسح المنتج', sub: 'Google Gemini AI', delay: '0s' },
  { icon: '💰', label: 'أفضل سعر', sub: 'وفّر 35%', delay: '0.7s' },
  { icon: '⭐', label: 'تقييم 4.8', sub: 'من 10,000+ مستخدم', delay: '1.4s' },
  { icon: '🏪', label: '50+ متجر', sub: 'Amazon, Noon, Jumia', delay: '2.1s' },
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
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-[#F58762]/8 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#432467]/8 blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-[#C95FA0]/6 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Phone visual ── LEFT column (order-2 = second in RTL grid = left side) */}
          <div className="relative order-2 flex justify-center items-center min-h-[480px] lg:min-h-[560px]">
            <div className="relative w-60 h-[480px] sm:w-68 sm:h-[520px]" style={{ width: '15rem', height: '30rem' }}>

              {/* Glow ring behind phone */}
              <div
                className="absolute -inset-6 rounded-full opacity-25"
                style={{
                  background: 'conic-gradient(from 0deg, #F58762, #C95FA0, #432467, #C95FA0, #F58762)',
                  filter: 'blur(28px)',
                }}
              />

              {/* Phone shell */}
              <div
                className="absolute inset-0 rounded-[3rem] border-4 border-white/70 shadow-2xl"
                style={{
                  background: 'linear-gradient(170deg, #FCDDD0 0%, #FDF8FF 45%, #E5D4F2 100%)',
                  boxShadow: '0 40px 80px rgba(67,36,103,0.25), 0 8px 32px rgba(201,95,160,0.15)',
                }}
              >
                {/* Phone screen */}
                <div className="absolute inset-3 rounded-[2.5rem] overflow-hidden bg-white/90 backdrop-blur-sm">
                  {/* App bar */}
                  <div className="p-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #F58762, #C95FA0, #432467)' }}>
                    <div className="w-6 h-6 rounded-full bg-white/25" />
                    <span className="text-white font-black text-base tracking-wide">ريفيوز</span>
                    <div className="w-6 h-6 rounded-full bg-white/25" />
                  </div>

                  {/* Search bar */}
                  <div className="px-3 pt-3 pb-1">
                    <div className="bg-[#FDF8FF] rounded-full px-3 py-2 flex items-center gap-2 border border-[#e8daf4]">
                      <span className="text-[#8b7aaa] text-xs">🔍</span>
                      <span className="text-[#8b7aaa] text-xs font-arabic">ابحث عن أي منتج...</span>
                    </div>
                  </div>

                  {/* Section label */}
                  <div className="px-3 py-1">
                    <span className="text-[9px] font-black text-[#8b7aaa] uppercase tracking-wider">الأكثر توفيراً</span>
                  </div>

                  {/* Product cards grid */}
                  <div className="px-3 grid grid-cols-2 gap-1.5">
                    {[
                      { name: 'آيفون 15', price: '2,999 ر.س', icon: '📱', discount: '-15%', store: 'Amazon' },
                      { name: 'سماعات سوني', price: '599 ر.س', icon: '🎧', discount: '-22%', store: 'Noon' },
                      { name: 'لابتوب ديل', price: '3,499 ر.س', icon: '💻', discount: '-10%', store: 'Jarir' },
                      { name: 'ساعة آبل', price: '1,499 ر.س', icon: '⌚', discount: '-8%', store: 'Extra' },
                    ].map((product, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl p-2 border border-[#e8daf4]"
                        style={{ boxShadow: '0 2px 8px rgba(67,36,103,0.06)' }}
                      >
                        <div className="text-xl mb-1 text-center">{product.icon}</div>
                        <div className="text-[10px] font-bold text-[#1a0a2e] text-right truncate">{product.name}</div>
                        <div className="text-[10px] font-black text-right" style={{ color: '#F58762' }}>{product.price}</div>
                        <div className="flex justify-between items-center mt-0.5">
                          <span className="text-[8px] text-[#8b7aaa]">{product.store}</span>
                          <span className="text-[9px] font-black text-green-600 bg-green-50 rounded-full px-1 py-0.5">{product.discount}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-around border-t border-[#e8daf4] bg-white/95">
                    {['🏠', '🔍', '🛒', '👤'].map((icon, i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <span className="text-sm">{icon}</span>
                        {i === 0 && <div className="w-1 h-1 rounded-full" style={{ background: '#F58762' }} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-[#1a0a2e] rounded-full" />
              </div>

              {/* ── Floating cards — RIGHT side of phone (towards center) ── */}
              {floatingCards.map((card, i) => {
                const positions = [
                  { top: '-16px',    right: '-148px' },  // card 0: top-right
                  { top: '18%',      right: '-162px' },  // card 1: upper-right
                  { top: '52%',      right: '-158px' },  // card 2: lower-right
                  { bottom: '-16px', right: '-148px' },  // card 3: bottom-right
                ]
                const pos = positions[i]
                return (
                  <div
                    key={i}
                    className="absolute glass rounded-pin px-3 py-2 flex items-center gap-2 shadow-lg"
                    style={{
                      ...pos,
                      minWidth: '148px',
                      animation: `floatAnimation 3s ease-in-out infinite`,
                      animationDelay: card.delay,
                    }}
                  >
                    <span className="text-lg flex-shrink-0">{card.icon}</span>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#1a0a2e]">{card.label}</div>
                      <div className="text-[10px] text-[#8b7aaa]">{card.sub}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Text content ── RIGHT column (order-1 = first in RTL grid = right side) */}
          <div className="order-1 text-right">

            {/* Badge */}
            {data.badge && (
              <div className="flex justify-end mb-6">
                <Badge variant="soft">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary ml-2 animate-pulse" />
                  {data.badge}
                </Badge>
              </div>
            )}

            {/* Headline */}
            <h1
              className="font-black text-[#1a0a2e] mb-5"
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              {titleParts[0]}
              <span className="gradient-text">{highlight}</span>
              {titleParts[1]}
            </h1>

            {/* Subtitle */}
            {data.subtitle && (
              <p className="text-xl font-bold mb-4" style={{ color: '#C95FA0' }}>
                {data.subtitle}
              </p>
            )}

            {/* Description */}
            {data.description && (
              <p className="text-lg text-[#8b7aaa] mb-8" style={{ lineHeight: 1.85 }}>
                {data.description}
              </p>
            )}

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-end mb-8">
              <Button variant="primary" size="lg" href={data.appStoreUrl ?? '#'}>
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.42.07 2.38.74 3.2.8 1.18-.24 2.34-.93 3.6-.85 1.54.12 2.69.73 3.44 1.88-3.26 1.97-2.57 6.16.64 7.41-.66 1.9-1.5 3.73-2.88 5.62zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                {data.primaryCta ?? 'حمّل مجاناً'}
              </Button>
              <Button variant="secondary" size="lg" href="#features">
                {data.secondaryCta ?? 'استكشف المنتجات'}
              </Button>
            </div>

            {/* Store badges */}
            <div className="flex flex-wrap gap-3 justify-end mb-10">
              <a
                href={data.appStoreUrl ?? '#'}
                className="flex items-center gap-2 px-4 py-2.5 rounded-pin transition-all duration-200 hover:opacity-90"
                style={{ background: '#1a0a2e', color: 'white' }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.42.07 2.38.74 3.2.8 1.18-.24 2.34-.93 3.6-.85 1.54.12 2.69.73 3.44 1.88-3.26 1.97-2.57 6.16.64 7.41-.66 1.9-1.5 3.73-2.88 5.62zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-right">
                  <div className="text-[10px] opacity-65">متاح على</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
              <a
                href={data.playStoreUrl ?? '#'}
                className="flex items-center gap-2 px-4 py-2.5 rounded-pin transition-all duration-200 hover:opacity-90"
                style={{ background: '#1a0a2e', color: 'white' }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.18 23.76a2 2 0 01-.8-.78L12 13.3l2.65 2.65-11.47 7.81zM.15 1.13A2 2 0 000 2v20a2 2 0 00.15.87L12 11 .15 1.13zM20.6 10.03L17.7 8.38 14.7 11l3 3 3-1.65a2 2 0 000-2.32zM3.18.24l11.47 7.81L12 10.7 2.38 1.02A2 2 0 013.18.24z" />
                </svg>
                <div className="text-right">
                  <div className="text-[10px] opacity-65">متاح على</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 justify-end">
              {[
                { value: data.stat1Value ?? '+10,000', label: data.stat1Label ?? 'منتج متاح' },
                { value: data.stat2Value ?? '+50',     label: data.stat2Label ?? 'متجر إلكتروني' },
                { value: data.stat3Value ?? '4.8★',    label: data.stat3Label ?? 'تقييم المستخدمين' },
              ].map((stat, i) => (
                <div key={i} className="text-right">
                  <div
                    className="text-2xl md:text-3xl font-black gradient-text"
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#8b7aaa] font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block' }}>
          <path d="M0 50V25C360 0 720 50 1080 25C1260 12 1380 22 1440 25V50H0Z" fill="rgba(253,248,255,0.6)" />
        </svg>
      </div>
    </section>
  )
}
