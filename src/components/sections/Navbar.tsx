'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'الميزات', href: '#features' },
  { label: 'التصنيفات', href: '#categories' },
  { label: 'التقييمات', href: '#testimonials' },
  { label: 'الأسئلة', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 font-arabic ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm shadow-primary-deep/5 border-b border-hairline'
          : 'bg-transparent'
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — right side in RTL */}
          <div className="flex-shrink-0">
            <a href="#hero" className="flex items-center gap-2">
              <span
                className="text-2xl font-black gradient-text"
                aria-label="ريفيوز"
              >
                ريفيوز
              </span>
              <span className="text-xs text-ink-mute font-semibold hidden sm:block">
                Reviyoz
              </span>
            </a>
          </div>

          {/* Desktop nav links — center */}
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

          {/* CTA — left side in RTL */}
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
              className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-hairline px-4 py-4 flex flex-col gap-2">
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
