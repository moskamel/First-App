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
  { num: "٥٠", sup: "ألف+", label: "منتج مفهرس", icon: "shopBag", color: "#F58762" },
  { num: "٢٠", sup: "+", label: "متجر شريك", icon: "shop", color: "#C95FA0" },
  { num: "٤٫٩", sup: "★", label: "تقييم آب ستور", icon: "star", color: "#432467" },
];

export default function Hero() {
  return (
    <section
      className="min-h-screen relative overflow-hidden pt-28 pb-48"
      style={{
        background: "linear-gradient(180deg, #FCDDD0 0%, #FDF8FF 55%, #E5D4F2 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute rounded-full pointer-events-none float-anim-slow"
        style={{
          top: "15%", right: "-10%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(245,135,98,0.35), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none float-anim-alt"
        style={{
          bottom: "-10%", left: "-10%",
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(67,36,103,0.2), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        {/* Meta pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-9 flex-wrap"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "#fff",
              border: "1px solid rgba(67,36,103,0.08)",
              boxShadow: "0 4px 12px -6px rgba(67,36,103,0.1)",
              color: "#1B0E2B",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#F58762", boxShadow: "0 0 8px #F58762" }}
            />
            أكثر من{" "}
            <strong style={{ color: "#C95FA0" }} className="mono">
              ٥٠
            </strong>{" "}
            ألف منتج
          </span>
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{ background: "#1B0E2B", color: "#FCDDD0" }}
          >
            <Icon name="shop" size={14} color="#F58762" strokeWidth={1.8} />
            أكثر من{" "}
            <strong style={{ color: "#F58762" }} className="mono">
              ٢٠٠٠
            </strong>{" "}
            متجر
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
          {/* Left: Headline */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black leading-[1.35] tracking-tighter mb-7"
              style={{ fontSize: "clamp(56px, 8vw, 120px)", color: "#1B0E2B" }}
            >
              <div>اكتشف.</div>
              <div className="grad-text">قارن.</div>
              <div className="flex items-baseline gap-4 flex-wrap">
                <span>اشترِ</span>
                <span
                  className="italic font-light"
                  style={{ fontSize: "0.5em", color: "#6B5575", letterSpacing: 0 }}
                >
                  — بذكاء.
                </span>
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-xl leading-relaxed mb-9 max-w-lg"
              style={{ color: "#3a2649" }}
            >
              تطبيق عربي يجمع لك آلاف المنتجات من أكبر المتاجر، يقارن أسعارها لحظياً، ويُريك
              المراجعات الحقيقية — كل ذلك بمسحة كاميرا واحدة.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex gap-4 flex-wrap mb-11"
            >
              <AppStoreBtn size="md" theme="dark" />
              <GooglePlayBtn size="md" theme="light" />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 pt-7 flex-wrap"
              style={{ borderTop: "1px solid rgba(67,36,103,0.1)" }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                  className="flex-1 min-w-[120px] relative rounded-2xl p-4 overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(67,36,103,0.06)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="absolute -top-2 -left-2 w-14 h-14 rounded-full"
                    style={{ background: `${s.color}18`, filter: "blur(8px)" }}
                  />
                  <div className="flex items-center justify-between mb-3 relative">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "#fff" }}
                    >
                      <Icon name={s.icon} size={15} color={s.color} strokeWidth={1.8} />
                    </div>
                    <span
                      className="font-[family-name:var(--font-mono)] text-[10px] font-bold tracking-widest"
                      style={{ color: s.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="flex items-baseline gap-1 font-black leading-none tracking-tighter mb-1 relative"
                    style={{ fontSize: 36, color: "#1B0E2B" }}
                  >
                    <span className="mono">{s.num}</span>
                    <span className="text-lg font-extrabold" style={{ color: s.color }}>
                      {s.sup}
                    </span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: "#6B5575" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone stack */}
          <div className="relative h-[600px] hidden lg:flex items-center justify-center">
            {/* Tooltip badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute top-5 right-0 z-10 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm"
              style={{
                background: "#1B0E2B",
                color: "#FCDDD0",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                transform: "rotate(-8deg)",
              }}
            >
              <Icon name="camera" size={15} color="#F58762" strokeWidth={1.8} />
              صوّر • اعرف • قارن
            </motion.div>

            {/* Left phone (scan screen) */}
            <div className="float-anim-slow" style={{ transform: "translateX(-40px) rotate(-6deg)" }}>
              <PhoneFrame delay={0.4}>
                <ScanScreen />
              </PhoneFrame>
            </div>

            {/* Right phone (app screenshot) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute right-5 top-8 float-anim-alt"
              style={{ width: 240, height: 500 }}
            >
              <div
                className="w-full h-full rounded-[36px] overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, #F58762 0%, #C95FA0 50%, #432467 100%)",
                  boxShadow: "0 30px 60px rgba(67,36,103,0.4)",
                  border: "2px solid rgba(255,255,255,0.15)",
                }}
              >
                <div className="p-5 text-white">
                  <div className="text-xs font-bold opacity-70 mb-1">الرئيسية</div>
                  <div className="text-lg font-black mb-4">مرحباً، محمد 👋</div>
                  <div className="rounded-xl bg-white/10 p-3 mb-3">
                    <div className="text-xs opacity-60 mb-1">الأكثر تقييماً</div>
                    <div className="text-sm font-bold">iPhone 16 Pro</div>
                    <div className="text-xs opacity-80">٢٢ متجر • من ١٨٠٠٠ ج.م</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["تقنية", "ملابس", "منزل", "رياضة"].map((cat) => (
                      <div
                        key={cat}
                        className="rounded-lg bg-white/10 p-2.5 text-xs font-bold text-center"
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Brands marquee */}
      <div
        className="absolute bottom-0 inset-x-0 py-5 overflow-hidden"
        style={{ background: "#1B0E2B" }}
      >
        <div
          className="marquee-track inline-flex items-center gap-7"
          style={{ direction: "ltr", paddingInlineStart: 28 }}
        >
          {[...brands, ...brands].flatMap((b, i) => [
            <div
              key={`${i}-b`}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center font-[family-name:var(--font-mono)] text-sm font-black"
                style={{
                  background: b.color,
                  color: (b as any).dark ? "#1B0E2B" : "#fff",
                }}
              >
                {b.name[0].toUpperCase()}
              </span>
              <span className="text-base font-bold" style={{ color: "#FCDDD0" }}>
                {b.ar}
              </span>
              <span
                className="font-[family-name:var(--font-mono)] text-[11px]"
                style={{ color: "#9E8AAE", opacity: 0.7 }}
              >
                {b.name}
              </span>
            </div>,
            <svg
              key={`${i}-s`}
              className="flex-shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={i % 2 === 0 ? "#F58762" : "#C95FA0"}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>,
          ])}
        </div>
      </div>
    </section>
  );
}
