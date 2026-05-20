"use client";
import { motion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/ui/Icons";

const jobs = [
  {
    title: "مطوّر React Native",
    team: "الهندسة", type: "دوام كامل", location: "القاهرة / عن بُعد",
    desc: "نبحث عن مطوّر متمرّس لبناء تجارب مستخدم استثنائية على iOS و Android.",
  },
  {
    title: "مطوّر Backend (Node.js / Supabase)",
    team: "الهندسة", type: "دوام كامل", location: "القاهرة / عن بُعد",
    desc: "تصميم وتطوير APIs قابلة للتوسع لخدمة ملايين المستخدمين.",
  },
  {
    title: "مصمم UX/UI",
    team: "التصميم", type: "دوام كامل", location: "القاهرة",
    desc: "تحويل رؤيتنا إلى تجارب رقمية عربية جميلة وسهلة الاستخدام.",
  },
  {
    title: "مدير تسويق رقمي",
    team: "التسويق", type: "دوام كامل", location: "القاهرة",
    desc: "قيادة استراتيجيات النمو وإدارة حضورنا الرقمي في مصر والخليج.",
  },
  {
    title: "محلل بيانات",
    team: "المنتج", type: "دوام كامل", location: "عن بُعد",
    desc: "استخلاص رؤى قيّمة من بيانات المستخدمين لتحسين المنتج ودفع النمو.",
  },
];

const perks = [
  { icon: "🏠", title: "عمل مرن", desc: "خيار العمل عن بُعد أو من المكتب بمرونة تامة." },
  { icon: "📈", title: "نمو سريع", desc: "تعلّم من فريق متمرّس في شركة تنمو بسرعة." },
  { icon: "💰", title: "تعويض تنافسي", desc: "راتب وحوافز ومشاركة في الأرباح." },
  { icon: "🎯", title: "تأثير حقيقي", desc: "عملك يصل مباشرة لملايين المستخدمين العرب." },
];

export default function Careers() {
  return (
    <main>
      <Nav />

      <section
        className="pt-32 pb-20 px-6 md:px-10 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #E5D4F2 0%, #FBF6F1 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-8"
              style={{ background: "rgba(67,36,103,0.1)", color: "#432467" }}
            >
              نحن نوظّف
            </div>
            <h1
              className="font-black tracking-tighter leading-[1.3] mb-6"
              style={{ fontSize: "clamp(52px, 7vw, 96px)", color: "#1B0E2B" }}
            >
              ابنِ المستقبل<br />
              <span className="grad-text">معنا.</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "#3a2649" }}>
              نبحث عن أشخاص شغوفين يريدون حل مشاكل حقيقية لمستخدمين عرب حقيقيين.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="px-6 md:px-10 py-20" style={{ background: "#fff" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-black mb-12 tracking-tight" style={{ color: "#1B0E2B" }}>
            لماذا ريفيوز؟
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6"
                style={{ background: "#FBF6F1" }}
              >
                <div className="text-3xl mb-4">{p.icon}</div>
                <div className="text-lg font-extrabold mb-2" style={{ color: "#1B0E2B" }}>{p.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: "#6B5575" }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="px-6 md:px-10 py-20" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-black mb-12 tracking-tight" style={{ color: "#1B0E2B" }}>
            الوظائف المتاحة
          </h2>
          <div className="space-y-4">
            {jobs.map((j, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-7 flex flex-col md:flex-row md:items-center gap-4 group cursor-pointer"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(67,36,103,0.06)",
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-extrabold" style={{ color: "#1B0E2B" }}>{j.title}</h3>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-md"
                      style={{ background: "rgba(245,135,98,0.1)", color: "#F58762" }}
                    >
                      {j.team}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed mb-3" style={{ color: "#6B5575" }}>{j.desc}</p>
                  <div className="flex items-center gap-4 text-sm" style={{ color: "#9E8AAE" }}>
                    <span>{j.type}</span>
                    <span>•</span>
                    <span>{j.location}</span>
                  </div>
                </div>
                <button
                  className="flex-shrink-0 px-6 py-3 rounded-full font-bold text-sm transition-all"
                  style={{
                    background: "#1B0E2B",
                    color: "#fff",
                  }}
                >
                  قدّم الآن
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
