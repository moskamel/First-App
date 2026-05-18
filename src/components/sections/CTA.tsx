'use client'

import React from 'react'
import { useInView } from '@/hooks/useInView'

interface CTAProps {
  appStoreUrl?: string
  playStoreUrl?: string
}

export default function CTA({ appStoreUrl, playStoreUrl }: CTAProps) {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      id="cta"
      className="relative overflow-hidden py-24"
      dir="rtl"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a0a2e 0%, #432467 40%, #C95FA0 80%, #F58762 100%)',
        }}
      />

      {/* Animated decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
          style={{ background: 'rgba(255,255,255,0.04)', animation: 'ctaPulse 4s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full"
          style={{ background: 'rgba(255,255,255,0.04)', animation: 'ctaPulse 5s ease-in-out infinite 1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border"
          style={{ borderColor: 'rgba(255,255,255,0.06)', animation: 'ctaSpin 30s linear infinite' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border"
          style={{ borderColor: 'rgba(255,255,255,0.08)', animation: 'ctaSpin 20s linear infinite reverse' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border"
          style={{ borderColor: 'rgba(255,255,255,0.1)', animation: 'ctaSpin 15s linear infinite' }}
        />
        <div
          className="absolute top-8 left-1/4 w-40 h-40 rounded-full"
          style={{ background: 'rgba(245,135,98,0.12)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute bottom-8 right-1/4 w-32 h-32 rounded-full"
          style={{ background: 'rgba(201,95,160,0.15)', filter: 'blur(30px)' }}
        />
      </div>

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }
        @keyframes ctaSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes ctaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* App icon */}
        <div
          className="flex justify-center mb-8"
          style={{
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)',
          }}
        >
          <div
            className="w-24 h-24 rounded-[2rem] flex items-center justify-center border shadow-2xl"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255,255,255,0.25)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              animation: 'ctaFloat 3s ease-in-out infinite',
            }}
          >
            <span className="text-4xl font-black text-white font-arabic">ر</span>
          </div>
        </div>

        {/* Headline */}
        <h2
          className="font-black mb-4 font-arabic"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
            background: 'linear-gradient(135deg, #ffffff 0%, #ffd4c2 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          حمّل ريفيوز الآن
        </h2>

        <p
          className="text-white/80 text-xl mb-4 font-arabic"
          style={{
            lineHeight: 1.8,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          اكتشف. قارن. اشترِ بذكاء.
        </p>

        <p
          className="text-white/60 text-base mb-10 font-arabic max-w-xl mx-auto"
          style={{
            lineHeight: 1.8,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          انضم إلى آلاف المتسوقين الذكار في العالم العربي الذين يوفّرون المال ويتخذون قرارات شراء أفضل مع ريفيوز
        </p>

        {/* Store buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          style={{
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* App Store */}
          <a
            href={appStoreUrl ?? '#'}
            className="group flex items-center gap-3 rounded-2xl px-6 py-4 font-bold min-w-[200px] justify-center font-arabic"
            style={{
              background: 'white',
              color: '#1a0a2e',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translateY(-3px)'
              el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            <svg className="w-7 h-7 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.42.07 2.38.74 3.2.8 1.18-.24 2.34-.93 3.6-.85 1.54.12 2.69.73 3.44 1.88-3.26 1.97-2.57 6.16.64 7.41-.66 1.9-1.5 3.73-2.88 5.62zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <div className="text-right">
              <div className="text-xs text-[#8b7aaa]">تحميل من</div>
              <div className="text-base font-black">App Store</div>
            </div>
          </a>

          {/* Google Play */}
          <a
            href={playStoreUrl ?? '#'}
            className="group flex items-center gap-3 rounded-2xl px-6 py-4 font-bold min-w-[200px] justify-center font-arabic"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              color: 'white',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translateY(-3px)'
              el.style.background = 'rgba(255,255,255,0.2)'
              el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translateY(0)'
              el.style.background = 'rgba(255,255,255,0.12)'
              el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'
            }}
          >
            <svg className="w-7 h-7 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.18 23.76a2 2 0 01-.8-.78L12 13.3l2.65 2.65-11.47 7.81zM.15 1.13A2 2 0 000 2v20a2 2 0 00.15.87L12 11 .15 1.13zM20.6 10.03L17.7 8.38 14.7 11l3 3 3-1.65a2 2 0 000-2.32zM3.18.24l11.47 7.81L12 10.7 2.38 1.02A2 2 0 013.18.24z" />
            </svg>
            <div className="text-right">
              <div className="text-xs text-white/70">تحميل من</div>
              <div className="text-base font-black">Google Play</div>
            </div>
          </a>
        </div>

        {/* Trust indicators */}
        <div
          className="flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm font-arabic"
          style={{
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(15px)',
          }}
        >
          {[
            { icon: '✅', label: 'مجاني تماماً' },
            { icon: '🚫', label: 'بدون إعلانات مزعجة' },
            { icon: '📱', label: 'iOS و Android' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="w-1 h-1 rounded-full bg-white/30" />}
              <span className="flex items-center gap-2">
                <span>{item.icon}</span>
                {item.label}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
