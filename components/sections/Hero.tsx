"use client";
import { motion } from "framer-motion";
import { AppStoreBtn, GooglePlayBtn } from "@/components/ui/AppStoreButtons";
import PhoneFrame, { ScanScreen } from "@/components/ui/PhoneFrame";
import Icon from "@/components/ui/Icons";

const brands = [
  { name: "Amazon", ar: "أمازون", color: "#FF9900" },
  { name: "noon", ar: "نون", color: "#FEEE00", dark: true },
  { name: "Jumia", ar: "جوميا", color: "#F68B1E" },
  { name: "B.TECH", ar: "بي تك", color: "#E2231A" },
  { name: "2B", ar: "تو بي", color: "#0D2C54" },
  { name: "Carrefour", ar: "كارفور", color: "#004E9F" },
  { name: "Spinneys", ar: "سبينيس", color: "#006B3F" },
  { name: "SHEIN", ar: "شي إن", color: "#222" },
  { name: "Talabat", ar: "طلبات", color: "#FF5A00" },
];

const stats = [
  { num: "٥٠ألف+", label: "منتج مفهرس", icon: "shopBag", color: "#F58762" },
  { num: "+٢٠", label: "متجر شريك", icon: "shop", color: "#C95FA0" },
  { num: "٤٫٩★", label: "تقييم آب ستور", icon: "star", color: "#432467" },
];

export default function Hero() {
  return (
    <section
      className="min-h-screen relative overflow-hidden pt-24 pb-36"
      style={{
        background: "linear-gradient(160deg, #FCDDD0 0%, #FDF8FF 50%, #E5D4F2 100%)",
      }}
    >
      {/* Decorative blobs — kept inside the section, no overflow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "5%", right: "5%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(245,135,98,0.25), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "10%", left: "5%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(67,36,103,0.15), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative">
        {/* Trust pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
          style={{
            background: "#fff",
            border: "1px solid rgba(67,36,103,0.1)",
            boxShadow: "0 4px 16px -8px rgba(67,36,103,0.15)",
            color: "#1B0E2B",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#F58762", boxShadow: "0 0 8px #F58762" }}
          />
          أكثر من <strong style={{ color: "#C95FA0" }}>٥٠,٠٠٠</strong> منتج من
          <strong style={{ color: "#432467" }}>+٢٠</strong> متجر
        </motion.div>

        {/* Main two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black leading-[1.25] tracking-tight mb-6"
              style={{ fontSize: "clamp(40px, 5vw, 76px)", color: "#1B0E2B" }}
            >
              اكتشف.{" "}
              <span className="grad-text">قارن.</span>
              <br />
              اشترِ بذكاء.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "#3a2649" }}
            >
              تطبيق عربي يجمع آلاف المنتجات من أكبر المتاجر، يقارن أسعارها لحظياً،
              ويُريك المراجعات الحقيقية — بمسحة كاميرا واحدة.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-3 flex-wrap mb-10"
            >
              <AppStoreBtn size="md" theme="dark" />
              <GooglePlayBtn size="md" theme="light" />
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-3 gap-3 pt-8"
              style={{ borderTop: "1px solid rgba(67,36,103,0.1)" }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(67,36,103,0.06)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="font-black text-xl mb-1 mono"
                    style={{ color: s.color }}
                  >
                    {s.num}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: "#6B5575" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Single phone mockup */}
          <div className="hidden lg:flex justify-center items-center relative">
            {/* Glow behind phone */}
            <div
              className="absolute rounded-full"
              style={{
                width: 320, height: 320,
                background: "radial-gradient(circle, rgba(245,135,98,0.3), transparent 65%)",
                filter: "blur(30px)",
              }}
            />

            {/* Floating badge — top */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute top-0 -right-4 z-10 flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm"
              style={{
                background: "#1B0E2B",
                color: "#FCDDD0",
                boxShadow: "0 8px 24px -8px rgba(0,0,0,0.4)",
                transform: "rotate(-6deg)",
              }}
            >
              <Icon name="camera" size={14} color="#F58762" strokeWidth={1.8} />
              صوّر • اعرف • قارن
            </motion.div>

            {/* Floating badge — bottom */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="absolute bottom-8 -left-4 z-10 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(67,36,103,0.1)",
                boxShadow: "0 12px 30px -10px rgba(67,36,103,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="text-xs font-semibold mb-0.5" style={{ color: "#6B5575" }}>
                تم التعرف على المنتج
              </div>
              <div className="text-sm font-black" style={{ color: "#1B0E2B" }}>
                وفّرت <span style={{ color: "#C95FA0" }}>٢٢٠٠ ج.م</span>
              </div>
            </motion.div>

            <div className="float-anim">
              <PhoneFrame delay={0.5}>
                <ScanScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>

      {/* Brands marquee strip */}
      <div
        className="absolute bottom-0 inset-x-0 py-4 overflow-hidden"
        style={{ background: "#1B0E2B" }}
      >
        <div
          className="marquee-track inline-flex items-center gap-6"
          style={{ direction: "ltr", paddingInlineStart: 24 }}
        >
          {[...brands, ...brands].flatMap((b, i) => [
            <div
              key={`${i}-b`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center font-black text-xs"
                style={{
                  background: b.color,
                  color: (b as { dark?: boolean }).dark ? "#1B0E2B" : "#fff",
                }}
              >
                {b.name[0]}
              </span>
              <span className="text-sm font-bold" style={{ color: "#FCDDD0" }}>
                {b.ar}
              </span>
            </div>,
            <svg
              key={`${i}-s`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill={i % 2 === 0 ? "#F58762" : "#9E8AAE"}
              className="flex-shrink-0"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>,
          ])}
        </div>
      </div>
    </section>
  );
}
