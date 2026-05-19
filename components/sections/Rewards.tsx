"use client";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Icon from "@/components/ui/Icons";

const levels = [
  {
    name: "مبتدئ", en: "Rookie", range: "٠ — ١٩٩",
    color: "#FCDDD0", accent: "#F58762", dark: false,
    perks: ["تصفّح كامل", "حفظ ٢٠ منتج", "مراجعات أساسية"],
    icon: "magicStar",
  },
  {
    name: "مساهم", en: "Contributor", range: "٢٠٠ — ٤٩٩",
    color: "#FBC2A0", accent: "#E66A40", dark: false,
    perks: ["كل ميزات مبتدئ", "حفظ غير محدود", "شارة مساهم", "كوبونات حصرية"],
    icon: "medalStar",
  },
  {
    name: "موثوق", en: "Trusted", range: "٥٠٠ — ٩٩٩",
    color: "#C95FA0", accent: "#FCDDD0", dark: true,
    perks: ["كل ميزات مساهم", "تنبيهات أسعار", "وصول مبكّر", "دعم أولوية"],
    icon: "shieldTick",
  },
  {
    name: "خبير", en: "Expert", range: "١٠٠٠+",
    color: "#432467", accent: "#F58762", dark: true,
    perks: ["كل ميزات موثوق", "مكافآت شهرية", "مراجع مُصادَق ✓", "شراكات حصرية"],
    icon: "crown",
  },
];

const points = [
  { action: "كتابة مراجعة", pts: "٥٠", icon: "note" },
  { action: "رفع صورة", pts: "٢٠", icon: "gallery" },
  { action: "مراجعة مفيدة", pts: "١٠", icon: "checkCircle" },
];

export default function Rewards() {
  return (
    <section
      id="rewards"
      className="relative overflow-hidden px-6 md:px-10 py-32"
      style={{ background: "linear-gradient(160deg, #432467 0%, #1B0E2B 100%)", color: "#FCDDD0" }}
    >
      {/* Blob */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "-15%", left: "20%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(245,135,98,0.3), transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-[1400px] mx-auto relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-end">
          <div>
            <SectionLabel num="٠٤" title="نظام المكافآت" color="#F58762" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black leading-[1.35] tracking-tighter"
              style={{ fontSize: "clamp(44px, 5vw, 84px)" }}
            >
              راجِع. اكسب.<br />
              <span style={{ color: "#F58762" }}>ارتقِ.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed max-w-lg"
            style={{ opacity: 0.8 }}
          >
            كل مراجعة كتبتها، كل صورة رفعتها، كل تفاعل قمت به — يقابله نقاط حقيقية.
            تجمعها. تترقّى. تفتح مكافآت.
          </motion.p>
        </div>

        {/* Points earned */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between rounded-2xl px-7 py-6"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(252,221,208,0.15)",
              }}
            >
              <div>
                <div
                  className="text-sm mb-2 flex items-center gap-2"
                  style={{ opacity: 0.6 }}
                >
                  <Icon name={p.icon} size={16} color="#FCDDD0" strokeWidth={1.6} />
                  {p.action}
                </div>
                <div
                  className="font-[family-name:var(--font-mono)] font-black leading-none"
                  style={{ fontSize: 36, color: "#F58762" }}
                >
                  +{p.pts}
                </div>
              </div>
              <div className="text-xs tracking-widest" style={{ color: "#9E8AAE" }}>
                نقطة
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tiers */}
        <div>
          <div className="flex justify-between items-baseline mb-7 flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <span
                className="font-[family-name:var(--font-mono)] text-xs font-bold tracking-widest px-3 py-1 rounded-md"
                style={{
                  color: "#F58762",
                  background: "rgba(245,135,98,0.1)",
                  border: "1px solid rgba(245,135,98,0.3)",
                }}
              >
                مستويات المستخدم
              </span>
              <span className="text-xl font-extrabold">أربعة مستويات. مكافآت تتضاعف.</span>
            </div>
            <span
              className="font-[family-name:var(--font-mono)] text-sm"
              style={{ opacity: 0.5 }}
            >
              <span className="mono">٠</span> ──→ <span className="mono">١٠٠٠+</span> نقطة
            </span>
          </div>

          {/* Progression rail */}
          <div className="relative h-1 rounded-full mb-5" style={{ background: "rgba(252,221,208,0.1)" }}>
            <div
              className="absolute inset-y-0 right-0 w-full rounded-full"
              style={{ background: "linear-gradient(to left, #FCDDD0, #F58762, #C95FA0, #432467)" }}
            />
            {[0, 25, 50, 75, 100].map((pct, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2"
                style={{
                  right: `${pct}%`,
                  transform: "translate(50%, -50%)",
                  background: i === 0 ? "#FCDDD0" : i === 4 ? "#432467" : "#F58762",
                  borderColor: "#1B0E2B",
                }}
              />
            ))}
          </div>

          {/* Tier cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {levels.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-[18px] p-6 overflow-hidden flex flex-col min-h-[320px]"
                style={{
                  background: l.color,
                  color: l.dark ? "#fff" : "#1B0E2B",
                  boxShadow: l.dark
                    ? "0 20px 40px -20px rgba(0,0,0,0.4)"
                    : "0 10px 30px -15px rgba(67,36,103,0.2)",
                }}
              >
                <div
                  className="absolute top-3.5 left-3.5 font-[family-name:var(--font-mono)] text-[10px] font-bold tracking-widest px-2 py-1 rounded-md"
                  style={{
                    color: l.accent,
                    background: l.dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.4)",
                  }}
                >
                  المستوى ٠{i + 1}
                </div>

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: l.dark ? "rgba(255,255,255,0.1)" : "rgba(27,14,43,0.06)",
                    border: l.dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(27,14,43,0.1)",
                  }}
                >
                  <Icon name={l.icon} size={26} color={l.accent} strokeWidth={1.6} />
                </div>

                <div className="text-[34px] font-black tracking-tight leading-none mb-2.5">{l.name}</div>
                <div
                  className="self-start text-xs font-bold px-2.5 py-1 rounded-md mb-5"
                  style={{ background: l.dark ? "rgba(255,255,255,0.1)" : "rgba(27,14,43,0.08)" }}
                >
                  <span className="mono">{l.range}</span> نقطة
                </div>

                <div
                  className="flex flex-col gap-2 pt-3.5"
                  style={{ borderTop: l.dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(27,14,43,0.1)" }}
                >
                  {l.perks.map((p, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm" style={{ opacity: 0.9 }}>
                      <Icon name="check" size={12} color={l.accent} strokeWidth={3} />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative circle */}
                <div
                  className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full"
                  style={{ background: l.accent, opacity: l.dark ? 0.1 : 0.15 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
