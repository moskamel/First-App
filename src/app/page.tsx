import {
  getHeroContent,
  getFeaturesContent,
  getTestimonialsContent,
  getFaqContent,
  getStatsContent,
  getFooterContent,
} from '@/lib/markdown'

import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function HomePage() {
  const heroData = getHeroContent().data
  const featuresData = getFeaturesContent().data
  const testimonialsData = getTestimonialsContent().data
  const faqData = getFaqContent().data
  const statsData = getStatsContent().data
  const footerData = getFooterContent().data

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
