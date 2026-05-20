"use client";
import Link from "next/link";

const columns = [
  {
    title: "التطبيق",
    links: [
      { l: "المميزات", h: "/features" },
      { l: "المتاجر", h: "/stores" },
      { l: "المكافآت", h: "/#rewards" },
      { l: "الفئات", h: "/#categories" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { l: "من نحن", h: "/about" },
      { l: "تواصل معنا", h: "/contact" },
      { l: "الوظائف", h: "/careers" },
      { l: "المدوّنة", h: "/blog" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { l: "الشروط", h: "/terms" },
      { l: "الخصوصية", h: "/privacy" },
      { l: "ملفات تعريف الارتباط", h: "/cookies" },
      { l: "الدعم", h: "/support" },
    ],
  },
];

const socialLinks = [
  {
    name: "إكس",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "إنستجرام",
    path: "M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  },
  {
    name: "تيك توك",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.87a8.16 8.16 0 0 0 4.77 1.52V7c-.61.01-1.21-.13-1.84-.31z",
  },
  {
    name: "فيسبوك",
    path: "M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z",
  },
  {
    name: "يوتيوب",
    path: "M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418A2.506 2.506 0 0 0 2.418 6.186C2 7.746 2 12 2 12s0 4.254.418 5.814a2.506 2.506 0 0 0 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.506 2.506 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15.464V8.536L16 12z",
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1B0E2B", color: "#FCDDD0" }} className="px-8 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <div className="text-3xl font-black grad-text">ريفيوز</div>
              <div
                className="font-[family-name:var(--font-mono)] text-sm mt-1"
                style={{ color: "rgba(252,221,208,0.5)" }}
              >
                Reviyoz
              </div>
            </div>
            <p className="text-base leading-relaxed mb-6 max-w-sm" style={{ opacity: 0.7 }}>
              تطبيق عربي لاكتشاف المنتجات، مقارنة الأسعار، وقراءة المراجعات الحقيقية.
            </p>
            <div className="font-[family-name:var(--font-mono)] text-xs" style={{ opacity: 0.4 }}>
              v1.0.0 · com.reviyoz.app
            </div>
          </div>

          {/* Nav Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-extrabold mb-5" style={{ color: "#F58762" }}>
                {col.title}
              </div>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <Link
                    key={l.l}
                    href={l.h}
                    className="text-[15px] transition-opacity hover:opacity-100"
                    style={{ opacity: 0.7 }}
                  >
                    {l.l}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap justify-between items-center gap-5 pt-8"
          style={{ borderTop: "1px solid rgba(252,221,208,0.15)" }}
        >
          <div className="text-sm" style={{ opacity: 0.6 }}>
            © <span className="mono">٢٠٢٦</span> ريفيوز. جميع الحقوق محفوظة.
          </div>
          <div className="flex gap-2.5">
            {socialLinks.map((s) => (
              <Link
                key={s.name}
                href="#"
                title={s.name}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(252,221,208,0.08)",
                  border: "1px solid rgba(252,221,208,0.15)",
                  color: "#FCDDD0",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#F58762";
                  (e.currentTarget as HTMLElement).style.borderColor = "#F58762";
                  (e.currentTarget as HTMLElement).style.color = "#1B0E2B";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(252,221,208,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(252,221,208,0.15)";
                  (e.currentTarget as HTMLElement).style.color = "#FCDDD0";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
