'use client'

import React, { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'

interface FAQ {
  question: string
  answer: string
}

interface FAQData {
  sectionBadge?: string
  sectionTitle?: string
  faqs?: FAQ[]
}

interface FAQProps {
  data: FAQData
}

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`border rounded-pin transition-all duration-200 overflow-hidden ${
        open
          ? 'border-primary/40 bg-surface-card shadow-md shadow-primary/5'
          : 'border-hairline bg-white hover:border-primary/20 hover:bg-surface-card'
      }`}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-right gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          {/* Number badge */}
          <span
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-200 ${
              open
                ? 'bg-gradient-to-br from-[#F58762] to-[#C95FA0] text-white'
                : 'bg-surface-soft text-ink-mute'
            }`}
          >
            {index + 1}
          </span>
        </div>

        <span className="flex-1 text-right font-bold text-ink font-arabic text-base">
          {faq.question}
        </span>

        {/* Expand icon */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            open
              ? 'border-primary bg-primary/10 rotate-45'
              : 'border-hairline'
          }`}
        >
          <svg
            className={`w-4 h-4 transition-colors duration-200 ${open ? 'text-primary' : 'text-ink-mute'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      {/* Answer */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6">
          <div className="mr-11 border-r-2 border-primary/30 pr-4">
            <p
              className="text-ink-mute text-right font-arabic leading-[1.9]"
            >
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ({ data }: FAQProps) {
  const faqs = data.faqs ?? []

  return (
    <section id="faq" className="section-padding" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={data.sectionBadge}
          title={data.sectionTitle ?? 'الأسئلة الشائعة'}
        />

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Contact prompt */}
        <div className="mt-10 text-center">
          <p className="text-ink-mute font-arabic mb-3">
            لم تجد إجابة سؤالك؟
          </p>
          <a
            href="mailto:hello@reviyoz.com"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline font-arabic"
          >
            تواصل مع فريق الدعم
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
