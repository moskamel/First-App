import type { Metadata } from "next";
import { Zain, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const zain = Zain({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "700", "800", "900"],
  variable: "--font-zain",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ريفيوز — اكتشف. قارن. اشترِ بذكاء",
  description:
    "تطبيق عربي يجمع لك آلاف المنتجات من أكبر المتاجر، يقارن أسعارها لحظياً، ويُريك المراجعات الحقيقية — كل ذلك بمسحة كاميرا واحدة.",
  keywords: ["ريفيوز", "مقارنة أسعار", "تسوق", "منتجات", "تطبيق عربي"],
  openGraph: {
    title: "ريفيوز — اكتشف. قارن. اشترِ بذكاء",
    description: "تطبيق عربي لاكتشاف المنتجات ومقارنة الأسعار",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${zain.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[family-name:var(--font-zain)]">{children}</body>
    </html>
  );
}
