"use client";
import { motion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/ui/Icons";

const features = [
  {
    num: "٠١", title: "المسح بالكاميرا", color: "#F58762",
    icon: "camera", bg: "#1B0E2B", textColor: "#FCDDD0",
    desc: "وجّه كاميرتك نحو أي منتج واعرف كل شيء عنه في ثوانٍ بفضل Google Gemini AI.",
    items: ["تعرّف على المنتج بالاسم العربي والإنجليزي", "عرض الفئة ونطاق السعر التقريبي", "سجل المسح محفوظ في حسابك", "ربط مباشر بأرخص متجر"],
  },
  {
    num: "٠٢", title: "مقارنة الأسعار", color: "#C95FA0",
    icon: "discount", bg: "linear-gradient(135deg, #FDF8FF, #FCDDD0)", textColor: "#1B0E2B",
    desc: "قارن أسعار أي منتج في جميع المتاجر الشريكة دفعةً واحدة، مع نسبة الخصم لكل متجر.",
    items: ["مقارنة فورية بين ٢٠+ متجر", "نسبة الخصم لكل متجر", "رابط مباشر للشراء", "تحديثات الأسعار لحظياً"],
  },
  {
    num: "٠٣", title: "البحث الذكي", color: "#432467",
    icon: "magicStar", bg: "#FBF6F1", textColor: "#1B0E2B",
    desc: "ابحث عن أي منتج أو علامة تجارية أو متجر — نتائج فورية من قاعدة بيانات ضخمة.",
    items: ["بحث فوري مع اقتراحات تلقائية", "فلترة حسب الفئة والسعر والمتجر", "تاريخ البحث محفوظ", "اقتراحات منتجات مشابهة"],
  },
  {
    num: "٠٤", title: "نظام المكافآت", color: "#F58762",
    icon: "crown", bg: "linear-gradient(135deg, #432467, #1B0E2B)", textColor: "#FCDDD0",
    desc: "اكسب نقاطاً عند كتابة المراجعات ورفع الصور، وارتقِ عبر أربعة مستويات من المكافآت.",
    items: ["٥٠ نقطة عند كل مراجعة", "٢٠ نقطة عند رفع صورة", "٤ مستويات: مبتدئ ← خبير", "كوبونات ومكافآت حصرية"],
  },
  {
    num: "٠٥", title: "استعراض المتاجر", color: "#C95FA0",
    icon: "shop", bg: "#FBF6F1", textColor: "#1B0E2B",
    desc: "تصفّح جميع المتاجر الشريكة، عروضهم، وكوبوناتهم من مكان واحد.",
    items: ["صفحة تفصيلية لكل متجر", "كوبونات وعروض حصرية", "بحث داخل كل متجر", "تقييمات المتاجر"],
  },
  {
    num: "٠٦", title: "الحساب الشخصي", color: "#432467",
    icon: "shieldTick", bg: "linear-gradient(135deg, #FCDDD0, #E5D4F2)", textColor: "#1B0E2B",
    desc: "أدر مفضلتك، سجل مشترياتك ومسحك، وتابع نقاطك ومستواك بسهولة.",
    items: ["تسجيل بالبريد أو Google", "المنتجات المحفوظة", "سجل المشتريات والمسح", "إعدادات الخصوصية والأمان"],
  },
];

export default function Features() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section
        className="pt-32 pb-20 px-6 md:px-10 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #E5D4F2 0%, #FDF8FF 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-black leading-[1.3] tracking-tighter mb-6"
            style={{ fontSize: "clamp(52px, 7vw, 96px)", color: "#1B0E2B" }}
          >
            كل الميزات،<br />
            <span className="grad-text">في تطبيق واحد.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#3a2649" }}
          >
            من المسح بالكاميرا إلى مقارنة الأسعار — كل أداة صُممت لتوفير وقتك ومالك.
          </motion.p>
        </div>
      </section>

      {/* Features grid */}
      <section className="px-6 md:px-10 py-24" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl p-8 flex flex-col"
              style={{ background: f.bg, color: f.textColor, minHeight: 360 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: f.textColor === "#FCDDD0" ? "rgba(255,255,255,0.1)" : "rgba(27,14,43,0.06)",
                    border: f.textColor === "#FCDDD0" ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(27,14,43,0.1)",
                  }}
                >
                  <Icon name={f.icon} size={26} color={f.color} strokeWidth={1.6} />
                </div>
                <span
                  className="font-[family-name:var(--font-mono)] text-xs font-bold tracking-widest opacity-40"
                >
                  {f.num}
                </span>
              </div>

              <h3 className="text-2xl font-black mb-3 tracking-tight">{f.title}</h3>
              <p className="text-base leading-relaxed mb-6 opacity-80 flex-1">{f.desc}</p>

              <ul className="space-y-2">
                {f.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm opacity-90">
                    <Icon name="check" size={12} color={f.color} strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
