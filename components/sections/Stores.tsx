"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import Icon from "@/components/ui/Icons";

const stores = [
  { name: "Amazon", ar: "أمازون", color: "#FF9900", tag: "متعدد الفئات", initial: "a" },
  { name: "noon", ar: "نون", color: "#FEEE00", dark: true, tag: "متجر شامل", initial: "n" },
  { name: "Jumia", ar: "جوميا", color: "#F68B1E", tag: "تسوّق عام", initial: "J" },
  { name: "B.TECH", ar: "بي تك", color: "#E2231A", tag: "إلكترونيات", initial: "B" },
  { name: "2B", ar: "تو بي", color: "#0D2C54", tag: "تقنية", initial: "2" },
  { name: "Carrefour", ar: "كارفور", color: "#004E9F", tag: "هايبر ماركت", initial: "C" },
  { name: "Spinneys", ar: "سبينيس", color: "#006B3F", tag: "سوبر ماركت", initial: "S" },
  { name: "Souq", ar: "سوق", color: "#F47B20", tag: "سوق إلكتروني", initial: "S" },
  { name: "SHEIN", ar: "شي إن", color: "#1B0E2B", tag: "موضة", initial: "S" },
  { name: "Talabat", ar: "طلبات", color: "#FF5A00", tag: "توصيل", initial: "t" },
];

export default function Stores() {
  return (
    <section id="stores" className="px-6 md:px-10 py-32" style={{ background: "#FBF6F1" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-16 flex-wrap gap-8">
          <div>
            <SectionLabel num="٠٥" title="شركاؤنا في مصر" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black leading-[1.35] tracking-tighter"
              style={{ fontSize: "clamp(44px, 5vw, 76px)", color: "#1B0E2B" }}
            >
              عشرات المتاجر،<br />
              <span className="grad-text">تطبيق واحد.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed max-w-md"
            style={{ color: "#6B5575" }}
          >
            من أكبر المتاجر المصرية والإقليمية — كل عروضهم وأسعارهم تحت تصرّفك في مكان واحد.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stores.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, boxShadow: "0 18px 36px -18px rgba(67,36,103,0.25)" }}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: "#fff",
                border: "1px solid rgba(67,36,103,0.06)",
                transition: "box-shadow 0.3s",
              }}
            >
              {/* Colored header */}
              <div
                className="p-4 relative flex flex-col justify-between"
                style={{
                  background: s.color,
                  minHeight: 110,
                  color: (s as any).dark ? "#1B0E2B" : "#fff",
                }}
              >
                <div
                  className="font-[family-name:var(--font-mono)] font-black leading-none"
                  style={{ fontSize: 48, letterSpacing: "-0.05em", opacity: 0.95 }}
                >
                  {s.initial}
                </div>
                <div
                  className="font-[family-name:var(--font-mono)] font-extrabold text-sm tracking-tight"
                >
                  {s.name}
                </div>
                <div className="absolute top-3 left-3 flex gap-1">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="w-1 h-1 rounded-full"
                      style={{
                        background: (s as any).dark
                          ? "rgba(27,14,43,0.3)"
                          : "rgba(255,255,255,0.4)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="px-4 py-3">
                <div className="text-base font-extrabold mb-0.5" style={{ color: "#1B0E2B" }}>
                  {s.ar}
                </div>
                <div className="text-xs" style={{ color: "#9E8AAE" }}>
                  {s.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-9 text-center">
          <Link
            href="/stores"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-base text-white transition-all hover:-translate-y-0.5"
            style={{
              background: "#1B0E2B",
              boxShadow: "0 12px 24px -12px rgba(27,14,43,0.4)",
            }}
          >
            <span
              className="mono px-2.5 py-0.5 rounded-full text-xs font-black"
              style={{ background: "#F58762", color: "#1B0E2B" }}
            >
              +١٢
            </span>
            استكشف جميع المتاجر
            <Icon name="arrowLeft" size={16} color="#fff" strokeWidth={2.2} />
          </Link>
          <div className="mt-3 text-sm" style={{ color: "#6B5575" }}>
            ونضيف المزيد كل أسبوع.
          </div>
        </div>
      </div>
    </section>
  );
}
