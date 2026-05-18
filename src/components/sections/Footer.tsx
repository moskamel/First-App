import React from 'react'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  section: string
  items: FooterLink[]
}

interface FooterData {
  tagline?: string
  appName?: string
  links?: FooterSection[]
  copyright?: string
}

interface FooterProps {
  data: FooterData
}

export default function Footer({ data }: FooterProps) {
  const links = data.links ?? []

  return (
    <footer className="bg-ink text-white" dir="rtl">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-4">
              <span
                className="text-3xl font-black gradient-text"
              >
                {data.appName ?? 'ريفيوز'}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-white/70 font-arabic text-base mb-6" style={{ lineHeight: 1.8 }}>
              {data.tagline ?? 'اكتشف. قارن. اشترِ بذكاء.'}
            </p>

            <p className="text-white/50 font-arabic text-sm" style={{ lineHeight: 1.8 }}>
              تطبيقك العربي الأول لاكتشاف أفضل المنتجات ومقارنة الأسعار من أكبر المتاجر الإلكترونية
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  label: 'تويتر',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: 'إنستغرام',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                             hover:bg-white/20 transition-colors duration-150"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {links.map((section, i) => (
            <div key={i}>
              <h3 className="font-black text-base text-white mb-4 font-arabic">
                {section.section}
              </h3>
              <ul className="space-y-2.5">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <a
                      href={item.href}
                      className="text-white/60 hover:text-white text-sm font-arabic transition-colors duration-150 block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm font-arabic">
            {data.copyright ?? '© 2026 Reviyoz. جميع الحقوق محفوظة.'}
          </p>
          <div className="flex items-center gap-4">
            <span
              className="text-xl font-black gradient-text"
            >
              ريفيوز
            </span>
            <span className="text-white/30 text-xs">Reviyoz</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
