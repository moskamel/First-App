import React from 'react'

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden py-24 px-8 text-center"
      dir="rtl"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to left, #432467, #C95FA0, #F58762)',
        }}
      />

      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/3" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl">
            📱
          </div>
        </div>

        {/* Headline */}
        <h2
          className="text-5xl md:text-6xl font-black text-white mb-4 font-arabic"
          style={{ lineHeight: 1.15 }}
        >
          حمّل ريفيوز الآن
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-xl font-arabic mb-10 leading-relaxed">
          ابدأ رحلتك في التسوق الذكي اليوم
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-white text-[#432467] font-black px-8 py-4 rounded-full
                       hover:bg-white/90 hover:shadow-xl hover:shadow-black/20 transition-all duration-200
                       font-arabic text-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.42.07 2.38.74 3.2.8 1.18-.24 2.34-.93 3.6-.85 1.54.12 2.69.73 3.44 1.88-3.26 1.97-2.57 6.16.64 7.41-.66 1.9-1.5 3.73-2.88 5.62zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            App Store
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-white/20 text-white font-black px-8 py-4 rounded-full
                       border-2 border-white hover:bg-white/30 hover:shadow-xl hover:shadow-black/20
                       transition-all duration-200 font-arabic text-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.18 23.76a2 2 0 01-.8-.78L12 13.3l2.65 2.65-11.47 7.81zM.15 1.13A2 2 0 000 2v20a2 2 0 00.15.87L12 11 .15 1.13zM20.6 10.03L17.7 8.38 14.7 11l3 3 3-1.65a2 2 0 000-2.32zM3.18.24l11.47 7.81L12 10.7 2.38 1.02A2 2 0 013.18.24z" />
            </svg>
            Google Play
          </a>
        </div>

        {/* Small print */}
        <p className="text-white/60 text-sm font-arabic">
          مجاني تماماً • iOS &amp; Android • بدون إعلانات مزعجة
        </p>
      </div>
    </section>
  )
}
