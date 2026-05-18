import React from 'react'

interface CTAProps {
  appStoreUrl?: string
  playStoreUrl?: string
}

export default function CTA({ appStoreUrl, playStoreUrl }: CTAProps) {
  return (
    <section id="cta" className="relative overflow-hidden py-24" dir="rtl">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a0a2e 0%, #432467 40%, #C95FA0 80%, #F58762 100%)',
        }}
      />

      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* App icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-[2rem] bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-2xl">
            <span className="text-4xl font-black text-white">ر</span>
          </div>
        </div>

        {/* Headline */}
        <h2
          className="text-white font-black mb-4 font-arabic"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}
        >
          حمّل ريفيوز الآن
        </h2>

        <p className="text-white/80 text-xl mb-4 font-arabic" style={{ lineHeight: 1.8 }}>
          اكتشف. قارن. اشترِ بذكاء.
        </p>

        <p className="text-white/60 text-base mb-10 font-arabic max-w-xl mx-auto" style={{ lineHeight: 1.8 }}>
          انضم إلى آلاف المتسوقين الذكار في العالم العربي الذين يوفّرون المال ويتخذون قرارات شراء أفضل مع ريفيوز
        </p>

        {/* Store buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={appStoreUrl ?? '#'}
            className="flex items-center gap-3 bg-white text-ink rounded-pin px-6 py-4 font-bold
                       hover:bg-surface-soft transition-all duration-200 hover:shadow-xl hover:shadow-white/20
                       hover:-translate-y-1 min-w-[180px] justify-center font-arabic"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.42.07 2.38.74 3.2.8 1.18-.24 2.34-.93 3.6-.85 1.54.12 2.69.73 3.44 1.88-3.26 1.97-2.57 6.16.64 7.41-.66 1.9-1.5 3.73-2.88 5.62zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <div className="text-right">
              <div className="text-xs text-ink-mute">تحميل من</div>
              <div className="text-base font-black">App Store</div>
            </div>
          </a>

          <a
            href={playStoreUrl ?? '#'}
            className="flex items-center gap-3 bg-white/15 border border-white/30 text-white rounded-pin px-6 py-4 font-bold
                       hover:bg-white/25 transition-all duration-200 hover:shadow-xl hover:shadow-white/10
                       hover:-translate-y-1 min-w-[180px] justify-center font-arabic backdrop-blur-sm"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.18 23.76a2 2 0 01-.8-.78L12 13.3l2.65 2.65-11.47 7.81zM.15 1.13A2 2 0 000 2v20a2 2 0 00.15.87L12 11 .15 1.13zM20.6 10.03L17.7 8.38 14.7 11l3 3 3-1.65a2 2 0 000-2.32zM3.18.24l11.47 7.81L12 10.7 2.38 1.02A2 2 0 013.18.24z" />
            </svg>
            <div className="text-right">
              <div className="text-xs text-white/70">تحميل من</div>
              <div className="text-base font-black">Google Play</div>
            </div>
          </a>
        </div>

        {/* Trust line */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-white/60 text-sm font-arabic">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            مجاني تماماً
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            بدون إعلانات مزعجة
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            يعمل على iOS و Android
          </span>
        </div>
      </div>
    </section>
  )
}
