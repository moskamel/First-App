import {
  getHeroContent,
  getFeaturesContent,
  getCategoriesContent,
  getTestimonialsContent,
  getFaqContent,
  getStatsContent,
  getFooterContent,
} from '@/lib/markdown'

import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Categories from '@/components/sections/Categories'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function HomePage() {
  const heroData = getHeroContent() as Record<string, unknown>
  const featuresData = getFeaturesContent() as Record<string, unknown>
  const categoriesData = getCategoriesContent() as Record<string, unknown>
  const testimonialsData = getTestimonialsContent() as Record<string, unknown>
  const faqData = getFaqContent() as Record<string, unknown>
  const statsData = getStatsContent() as Record<string, unknown>
  const footerData = getFooterContent() as Record<string, unknown>

  return (
    <main dir="rtl" className="font-arabic">
      <Navbar />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Hero data={heroData as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Features data={featuresData as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Stats data={statsData as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Categories data={categoriesData as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Testimonials data={testimonialsData as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <FAQ data={faqData as any} />
      <CTA
        appStoreUrl={heroData.appStoreUrl as string | undefined}
        playStoreUrl={heroData.playStoreUrl as string | undefined}
      />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Footer data={footerData as any} />
    </main>
  )
}
