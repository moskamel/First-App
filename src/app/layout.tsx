import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ريفيوز — اكتشف. قارن. اشترِ بذكاء.',
  description: 'تطبيق عربي متكامل لاكتشاف المنتجات ومقارنة الأسعار من أكبر المتاجر الإلكترونية',
  keywords: 'تسوق ذكي, مقارنة أسعار, تطبيق عربي, ريفيوز, أفضل سعر',
  openGraph: {
    title: 'ريفيوز — اكتشف. قارن. اشترِ بذكاء.',
    description: 'تطبيق عربي متكامل لاكتشاف المنتجات ومقارنة الأسعار',
    locale: 'ar_SA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zain:wght@200;300;400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-arabic antialiased">{children}</body>
    </html>
  )
}
