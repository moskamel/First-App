'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'الميزات', href: '#features' },
  { label: 'التقييمات', href: '#testimonials' },
  { label: 'الأسئلة', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 font-arabic"
      dir="rtl"
      style={{ pointerEvents: 'none' }}
    >
      {/* Floating pill container */}
      <div
        style={{
          pointerEvents: 'auto',
          maxWidth: scrolled ? '900px' : '100%',
          margin: '0 auto',
          marginTop: scrolled ? '16px' : '0px',
          padding: scrolled ? '0 20px' : '0',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            background: scrolled ? 'rgba(255,255,255,0.94)' : 'transparent',
            backdropFilter: scrolled ? 'blur(24px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
            borderRadius: scrolled ? '30px' : '0px',
            boxShadow: scrolled ? '0 8px 40px rgba(67,36,103,0.14), 0 2px 12px rgba(201,95,160,0.08)' : 'none',
            border: scrolled ? '1px solid rgba(232,218,244,0.7)' : '1px solid transparent',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: scrolled ? '0 8px' : '0 16px',
          }}
        >
          {/* Top padding when scrolled */}
          {scrolled && <div style={{ height: '8px' }} />}

          <div
            className="flex items-center justify-between"
            style={{
              height: scrolled ? '56px' : '68px',
              transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              paddingLeft: '8px',
              paddingRight: '8px',
            }}
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#hero" className="flex items-center gap-2">
                <span className="text-2xl font-black gradient-text" aria-label="ريفيوز">
                  ريفيوز
                </span>
                <span className="text-xs text-ink-mute font-semibold hidden sm:block">
                  Reviyoz
                </span>
              </a>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-pin text-sm font-semibold text-ink-soft hover:text-primary hover:bg-surface-soft transition-all duration-150"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center">
              <Button variant="primary" size="sm" href="#cta">
                حمّل التطبيق
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-pin hover:bg-surface-soft transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              <span
                className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>

          {scrolled && <div style={{ height: '8px' }} />}
        </div>
      </div>

      {/* Mobile menu — outside pill, always full width */}
      <div
        style={{
          pointerEvents: menuOpen ? 'auto' : 'none',
          overflow: 'hidden',
          maxHeight: menuOpen ? '400px' : '0px',
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-hairline px-4 py-4 flex flex-col gap-2 mx-2 rounded-b-2xl shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-pin text-base font-semibold text-ink-soft hover:text-primary hover:bg-surface-soft transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <Button variant="primary" size="md" href="#cta" className="w-full justify-center">
              حمّل التطبيق مجاناً
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
