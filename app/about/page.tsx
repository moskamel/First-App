"use client";
import { motion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { AppStoreBtn, GooglePlayBtn } from "@/components/ui/AppStoreButtons";

const values = [
  { icon: "🔍", title: "الشفافية أولاً", desc: "نُريك الأسعار الحقيقية من المصادر المباشرة — بدون تحيّز أو إخفاء." },
  { icon: "🤝", title: "مجتمع حقيقي", desc: "مراجعات من مستخدمين حقيقيين، لا إعلانات مُقنّعة ولا آراء مدفوعة." },
  { icon: "🚀", title: "تقنية بخدمة المستخدم", desc: "نستخدم الذكاء الاصطناعي ليس لبهرجة التصميم، بل لتوفير وقتك ومالك." },
  { icon: "🌍", title: "عربي في الجوهر", desc: "بُني ريفيوز للمستخدم العربي: RTL كامل، محتوى عربي، ودعم محلي." },
];

export default function About() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section
        className="min-h-[70vh] flex items-center px-6 md:px-10 pt-28 pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FCDDD0 0%, #FDF8FF 100%)" }}
      >
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,135,98,0.3), transparent 70%)", filter: "blur(40px)" }}
        />
        <div className="max-w-[1200px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-8"
              style={{ background: "rgba(245,135,98,0.12)", color: "#F58762", border: "1px solid rgba(245,135,98,0.3)" }}
            >
              من نحن
            </div>
            <h1
              className="font-black leading-[1.3] tracking-tighter mb-8"
              style={{ fontSize: "clamp(52px, 7vw, 100px)", color: "#1B0E2B" }}
            >
              نُؤمن أن التسوّق الذكي<br />
              <span className="grad-text">حق للجميع.</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "#3a2649" }}>
              ريفيوز وُلد من فكرة بسيطة: لماذا يجب على المستخدم العربي أن يفتح عشرات المتاجر
              والمواقع للعثور على أفضل سعر؟ قررنا أن نحل هذه المشكلة مرة وإلى الأبد.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 md:px-10 py-24" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-6 tracking-tight" style={{ color: "#1B0E2B" }}>
              القصة
            </h2>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "#3a2649" }}>
              <p>
                في عام ٢٠٢٤، وجد مؤسسو ريفيوز أنفسهم في موقف مألوف لكثير منا:
                البحث عن جهاز إلكتروني بسعر مناسب، والتنقل بين أمازون، نون، وجوميا
                وغيرها — دون أن يجدوا طريقة سهلة للمقارنة.
              </p>
              <p>
                بدأوا ببناء أداة بسيطة لأنفسهم، ثم اكتشفوا أن ملايين المستخدمين
                العرب يعانون من نفس المشكلة. كان الحل واضحاً: تطبيق عربي متكامل،
                مبني للسوق المحلي، يدمج الذكاء الاصطناعي مع سهولة الاستخدام.
              </p>
              <p>
                اليوم، يخدم ريفيوز آلاف المستخدمين يومياً عبر مصر ودول الخليج.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { num: "٥٠ألف+", label: "منتج مفهرس" },
              { num: "٢٠+", label: "متجر شريك" },
              { num: "٤٫٩★", label: "تقييم التطبيق" },
              { num: "٢٠٢٤", label: "سنة التأسيس" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 text-center"
                style={{ background: i % 2 === 0 ? "#FCDDD0" : "#E5D4F2" }}
              >
                <div className="text-3xl font-black mb-2 mono" style={{ color: "#1B0E2B" }}>{s.num}</div>
                <div className="text-sm font-semibold" style={{ color: "#6B5575" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-10 py-24" style={{ background: "#fff" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl font-black mb-16 tracking-tight text-center" style={{ color: "#1B0E2B" }}>
            قيمنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-7"
                style={{ background: "#FBF6F1", border: "1px solid rgba(67,36,103,0.06)" }}
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-extrabold mb-3" style={{ color: "#1B0E2B" }}>{v.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "#6B5575" }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 md:px-10 py-24 text-center"
        style={{ background: "linear-gradient(135deg, #432467, #1B0E2B)" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-6 text-white tracking-tight">جاهز تبدأ توفّر؟</h2>
          <p className="text-lg mb-10 text-white/70">حمّل التطبيق مجاناً وابدأ تجربتك.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <AppStoreBtn size="md" theme="dark" />
            <GooglePlayBtn size="md" theme="light" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
