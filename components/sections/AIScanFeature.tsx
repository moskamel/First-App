"use client";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import PhoneFrame, { ScanScreen } from "@/components/ui/PhoneFrame";
import Icon from "@/components/ui/Icons";

const features = [
  { k: "دقّة عالية", v: "تعرّف موثوق على آلاف المنتجات", icon: "shieldTick" },
  { k: "ثنائي اللغة", v: "نتائج عربية وإنجليزية معاً", icon: "globe" },
  { k: "سجل محفوظ", v: "كل عملية مسح في حسابك", icon: "documentText" },
  { k: "سعر تقريبي", v: "نطاق سعر فوري قبل المقارنة", icon: "flash" },
];

export default function AIScanFeature() {
  return (
    <section
      id="features"
      className="relative overflow-hidden px-6 md:px-10 py-32"
      style={{ background: "#1B0E2B", color: "#FCDDD0" }}
    >
      {/* Giant background number */}
      <div
        className="absolute top-10 left-10 font-[family-name:var(--font-mono)] font-black leading-none pointer-events-none select-none"
        style={{ fontSize: 320, color: "rgba(245,135,98,0.06)", lineHeight: 0.85 }}
      >
        ٠١
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Phone mockup */}
          <div className="flex justify-center relative">
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 420, height: 420,
                background: "radial-gradient(circle, rgba(245,135,98,0.3), transparent 60%)",
                filter: "blur(30px)",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <PhoneFrame glow>
              <ScanScreen />
            </PhoneFrame>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute top-8 right-[5%] z-10 flex items-center gap-1.5 px-3 py-2 rounded-xl"
              style={{
                background: "rgba(245,135,98,0.15)",
                border: "1px solid rgba(245,135,98,0.4)",
                backdropFilter: "blur(20px)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#F58762",
                transform: "rotate(4deg)",
              }}
            >
              <Icon name="magicStar" size={14} color="#F58762" strokeWidth={1.8} />
              تشغيل المسح
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-20 -left-4 z-10 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                transform: "rotate(-3deg)",
              }}
            >
              <div className="text-[11px] font-semibold mb-1" style={{ opacity: 0.6 }}>
                زمن المعالجة
              </div>
              <div
                className="font-[family-name:var(--font-mono)] font-black"
                style={{ fontSize: 22, color: "#F58762" }}
              >
                <span className="mono">١٫٤</span> ثانية
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel num="٠١" title="المسح بالكاميرا" color="#F58762" />
            <h2
              className="font-black leading-[1.35] tracking-tighter mb-7"
              style={{ fontSize: "clamp(44px, 5vw, 84px)" }}
            >
              وجّه كاميرتك<br />
              <span style={{ color: "#F58762" }}>وستعرف كل شيء.</span>
            </h2>
            <p className="text-lg leading-relaxed mb-9 max-w-lg" style={{ opacity: 0.8 }}>
              تقنية ذكاء اصطناعي متقدّمة تتعرّف على أي منتج تصوّره في ثوانٍ —
              تُعيد لك الاسم بالعربية والإنجليزية، الفئة، ونطاق السعر،
              ثم تربطك مباشرة بأرخص متجر يبيعه.
            </p>

            <div className="grid grid-cols-2 gap-0">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="py-4"
                  style={{ borderTop: "1px solid rgba(252,221,208,0.15)" }}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Icon name={f.icon} size={20} color="#F58762" strokeWidth={1.8} />
                    <div className="text-lg font-extrabold" style={{ color: "#FCDDD0" }}>
                      {f.k}
                    </div>
                  </div>
                  <div className="text-sm pr-8" style={{ opacity: 0.6 }}>
                    {f.v}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
