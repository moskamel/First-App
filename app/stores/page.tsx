"use client";
import { motion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const stores = [
  { name: "Amazon", ar: "أمازون", color: "#FF9900", tag: "متعدد الفئات", desc: "أكبر متجر إلكتروني عالمياً — ملايين المنتجات بأسعار تنافسية مع توصيل سريع." },
  { name: "noon", ar: "نون", color: "#FEEE00", dark: true, tag: "متجر شامل", desc: "المنصة الرائدة في الشرق الأوسط — إلكترونيات، أزياء، بقالة، وأكثر." },
  { name: "Jumia", ar: "جوميا", color: "#F68B1E", tag: "تسوّق عام", desc: "المنصة الأولى في أفريقيا والشرق الأوسط لتسوق الإلكترونيات والأزياء." },
  { name: "B.TECH", ar: "بي تك", color: "#E2231A", tag: "إلكترونيات", desc: "متخصص في الأجهزة الإلكترونية والمنزلية — خدمة ما بعد البيع وضمان موثوق." },
  { name: "2B", ar: "تو بي", color: "#0D2C54", tag: "تقنية", desc: "تشكيلة واسعة من الأجهزة والإكسسوارات التقنية بأسعار منافسة." },
  { name: "Carrefour", ar: "كارفور", color: "#004E9F", tag: "هايبر ماركت", desc: "كل احتياجاتك اليومية من البقالة والإلكترونيات والملابس في مكان واحد." },
  { name: "Spinneys", ar: "سبينيس", color: "#006B3F", tag: "سوبر ماركت", desc: "سوبر ماركت متميّز بتشكيلة من المنتجات المحلية والمستوردة عالية الجودة." },
  { name: "Souq", ar: "سوق", color: "#F47B20", tag: "سوق إلكتروني", desc: "سوق رقمي متنوع بملايين المنتجات من بائعين محليين وعالميين." },
  { name: "SHEIN", ar: "شي إن", color: "#1B0E2B", tag: "موضة", desc: "أحدث صيحات الموضة بأسعار في المتناول — تشكيلات يومية متجددة." },
  { name: "Talabat", ar: "طلبات", color: "#FF5A00", tag: "توصيل", desc: "توصيل سريع للمطاعم والبقالة والصيدليات — في أقل من ساعة." },
];

export default function StoresPage() {
  return (
    <main>
      <Nav />

      <section
        className="pt-32 pb-16 px-6 md:px-10"
        style={{ background: "linear-gradient(180deg, #FCDDD0 0%, #FBF6F1 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6"
              style={{ background: "rgba(67,36,103,0.08)", color: "#432467" }}
            >
              شركاؤنا
            </div>
            <h1
              className="font-black tracking-tighter leading-[1.3] mb-6"
              style={{ fontSize: "clamp(52px, 6vw, 88px)", color: "#1B0E2B" }}
            >
              عشرات المتاجر،<br />
              <span className="grad-text">تطبيق واحد.</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "#3a2649" }}>
              كل المتاجر الكبرى في مصر والمنطقة — أسعارهم وعروضهم تحت تصرّفك، محدّثة لحظياً.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: "#fff", border: "1px solid rgba(67,36,103,0.06)" }}
            >
              <div
                className="p-6 flex items-end justify-between"
                style={{
                  background: s.color,
                  minHeight: 120,
                  color: (s as any).dark ? "#1B0E2B" : "#fff",
                }}
              >
                <div>
                  <div
                    className="font-[family-name:var(--font-mono)] text-5xl font-black leading-none mb-1"
                    style={{ opacity: 0.9 }}
                  >
                    {s.name[0]}
                  </div>
                  <div className="font-[family-name:var(--font-mono)] font-bold text-sm">{s.name}</div>
                </div>
                <div
                  className="text-xs font-bold px-2.5 py-1 rounded-md"
                  style={{
                    background: (s as any).dark ? "rgba(27,14,43,0.15)" : "rgba(255,255,255,0.2)",
                  }}
                >
                  {s.tag}
                </div>
              </div>
              <div className="p-5">
                <div className="text-xl font-extrabold mb-2" style={{ color: "#1B0E2B" }}>{s.ar}</div>
                <p className="text-sm leading-relaxed" style={{ color: "#6B5575" }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
