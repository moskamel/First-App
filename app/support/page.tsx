"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const faqs = [
  { q: "كيف أشغّل ميزة المسح بالكاميرا؟", a: "افتح التطبيق واضغط على أيقونة الكاميرا في شريط البحث، ثم وجّه الكاميرا نحو أي منتج. ستظهر النتائج خلال ثوانٍ." },
  { q: "هل ريفيوز مجاني تماماً؟", a: "نعم، ريفيوز مجاني بالكامل للمستخدمين. نحن نكسب من الشراكات مع المتاجر وليس من المستخدمين." },
  { q: "كيف أكسب نقاطاً؟", a: "اكسب ٥٠ نقطة عند كتابة مراجعة، ٢٠ نقطة عند رفع صورة، و١٠ نقاط عند تصويت شخص آخر على مراجعتك بـ'مفيدة'." },
  { q: "هل يمكنني استخدام التطبيق بدون حساب؟", a: "نعم، يمكنك تصفّح المنتجات ومقارنة الأسعار دون تسجيل. لكن ستحتاج حساباً لحفظ المنتجات وكسب النقاط." },
  { q: "كيف أحذف حسابي؟", a: "اذهب إلى الإعدادات ← الخصوصية ← حذف الحساب. سيتم حذف جميع بياناتك خلال ٣٠ يوماً." },
  { q: "هل بياناتي آمنة؟", a: "نعم. نستخدم تشفيراً كاملاً للبيانات الحساسة وتخزيناً آمناً عبر Expo Secure Store. لن نبيع بياناتك أبداً." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl cursor-pointer"
      style={{ background: "#fff", border: "1px solid rgba(67,36,103,0.06)" }}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-right"
        onClick={() => setOpen(!open)}
      >
        <span className="text-base font-extrabold" style={{ color: "#1B0E2B" }}>{q}</span>
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform"
          style={{
            background: "rgba(67,36,103,0.06)",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#432467" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6 text-base leading-relaxed" style={{ color: "#6B5575" }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function Support() {
  return (
    <main>
      <Nav />

      <section
        className="pt-32 pb-16 px-6 md:px-10"
        style={{ background: "linear-gradient(180deg, #FCDDD0 0%, #FBF6F1 100%)" }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="font-black tracking-tighter leading-[1.3] mb-6"
              style={{ fontSize: "clamp(48px, 6vw, 88px)", color: "#1B0E2B" }}
            >
              كيف نساعدك؟
            </h1>
            <p className="text-xl leading-relaxed max-w-xl mx-auto" style={{ color: "#3a2649" }}>
              إجابات لأكثر الأسئلة شيوعاً، أو تواصل مع فريق الدعم مباشرة.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl font-black mb-10 tracking-tight" style={{ color: "#1B0E2B" }}>
            الأسئلة الشائعة
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>

          <div
            className="mt-16 rounded-3xl p-10 text-center"
            style={{ background: "linear-gradient(135deg, #432467, #1B0E2B)", color: "#FCDDD0" }}
          >
            <h3 className="text-2xl font-black mb-3">لم تجد إجابتك؟</h3>
            <p className="mb-6 opacity-80">فريق الدعم جاهز على واتساب طوال اليوم.</p>
            <a
              href="https://wa.me/201000000000"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.117 1.528 5.845L.073 23.927l6.198-1.437A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 0 1-5.034-1.389l-.361-.213-3.679.853.886-3.576-.234-.375A9.793 9.793 0 0 1 2.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
              </svg>
              تحدّث معنا على واتساب
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
