"use client";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import PhoneFrame, { CompareScreen } from "@/components/ui/PhoneFrame";
import Icon from "@/components/ui/Icons";

const rows = [
  { l: "متوسط سعر السوق", v: "١٩٤٥٠", mute: true, line: true },
  { l: "أفضل سعر — ريفيوز", v: "١٧٢٥٠", mute: false, line: false },
  { l: "إجمالي التوفير", v: "٢٢٠٠ ج.م", big: true, mute: false, line: false },
];

export default function PriceCompareFeature() {
  return (
    <section
      className="relative overflow-hidden px-6 md:px-10 py-32"
      style={{ background: "linear-gradient(180deg, #FDF8FF 0%, #FCDDD0 100%)" }}
    >
      {/* Giant background number */}
      <div
        className="absolute top-10 right-10 font-[family-name:var(--font-mono)] font-black leading-none pointer-events-none select-none"
        style={{ fontSize: 320, color: "rgba(67,36,103,0.05)", lineHeight: 0.85 }}
      >
        ٠٢
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel num="٠٢" title="مقارنة الأسعار" />
            <h2
              className="font-black leading-[1.35] tracking-tighter mb-7"
              style={{ fontSize: "clamp(32px, 4vw, 60px)", color: "#1B0E2B" }}
            >
              <span className="grad-text">سعر واحد</span>
              <br />
              في كل المتاجر.
            </h2>
            <p className="text-lg leading-relaxed mb-9 max-w-lg" style={{ color: "#3a2649" }}>
              بدلاً من فتح عشرات التطبيقات والمواقع — ضع المنتج، ودَع ريفيوز يعرض لك أسعاره في{" "}
              <strong>أمازون، نون، جوميا، بي تك</strong> وكل المتاجر دفعةً واحدة، مع نسبة الخصم لكل واحد.
            </p>

            {/* Savings card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-6 max-w-md relative"
              style={{
                background: "#FBF6F1",
                border: "1px dashed rgba(67,36,103,0.2)",
                boxShadow: "0 20px 40px -20px rgba(67,36,103,0.15)",
              }}
            >
              <div
                className="flex items-center gap-1.5 mb-4 font-[family-name:var(--font-mono)] text-[11px] tracking-widest"
                style={{ color: "#6B5575" }}
              >
                <Icon name="discount" size={14} color="#C95FA0" strokeWidth={1.8} />
                توفير عند كل عملية شراء
              </div>
              {rows.map((r, i) => (
                <div
                  key={i}
                  className="flex justify-between items-baseline py-2.5"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid rgba(67,36,103,0.08)",
                    borderStyle: r.big ? "solid" : i === 0 ? "none" : "dashed",
                  }}
                >
                  <span
                    className="font-medium"
                    style={{
                      fontSize: r.big ? 18 : 15,
                      color: r.mute ? "#6B5575" : "#1B0E2B",
                      fontWeight: r.big ? 800 : 500,
                    }}
                  >
                    {r.l}
                  </span>
                  <span
                    className="mono font-black"
                    style={{
                      fontSize: r.big ? 28 : 18,
                      color: r.big ? "#C95FA0" : r.mute ? "#9E8AAE" : "#1B0E2B",
                      textDecoration: r.line ? "line-through" : "none",
                    }}
                  >
                    {r.v}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Phone */}
          <div className="flex justify-center relative">
            <PhoneFrame tilt={4} delay={0.3}>
              <CompareScreen />
            </PhoneFrame>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute flex items-center gap-2 font-bold text-sm"
              style={{
                top: 220,
                right: -30,
                transform: "rotate(-15deg)",
                fontFamily: "var(--font-mono)",
                color: "#C95FA0",
              }}
            >
              <Icon name="arrowRight" size={16} color="#C95FA0" strokeWidth={2.2} />
              الأفضل سعراً
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
