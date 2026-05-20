"use client";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { StarFilled } from "@/components/ui/Icons";
import Icon from "@/components/ui/Icons";

const reviews = [
  {
    name: "سارة م.", loc: "القاهرة", level: "خبير",
    text: "حرفياً وفّرت أكثر من ١٥٠٠ جنيه آخر شهر. بقيت أكتب مراجعة بعد كل شراء — حلو وصار عادة.",
    rating: 5,
  },
  {
    name: "خالد ع.", loc: "الإسكندرية", level: "موثوق",
    text: "ميزة الكاميرا سحر. صوّرت سماعات في معرض، التطبيق طلعها مع كل الأسعار. اشتريت أرخص بـ٣٠٪.",
    rating: 5,
  },
  {
    name: "لينا ك.", loc: "الجيزة", level: "مساهم",
    text: "كانت تجربة تسوّقي قبل ريفيوز فوضى — تطبيق هنا، موقع هناك. دلوقتي كل حاجة في مكان واحد.",
    rating: 5,
  },
  {
    name: "يوسف ح.", loc: "المنصورة", level: "موثوق",
    text: "البحث الذكي بيوفّر وقت كتير. أكتب اسم منتج وفي ثانية ألاقي مقارنة كاملة بين كل المتاجر.",
    rating: 5,
  },
  {
    name: "منى س.", loc: "طنطا", level: "خبير",
    text: "النقاط بتتجمع بسرعة لما تكتب مراجعات بانتظام. وصلت لمستوى خبير في أقل من شهرين.",
    rating: 5,
  },
  {
    name: "أحمد ر.", loc: "أسيوط", level: "مساهم",
    text: "سهولة التطبيق وسرعته في عرض الأسعار خلتني أستغني عن أي تطبيق مقارنة تاني.",
    rating: 5,
  },
];

function ReviewCard({ r }: { r: (typeof reviews)[0] }) {
  return (
    <div
      className="rounded-2xl p-7 flex flex-col gap-5 flex-shrink-0"
      style={{
        width: 380,
        background: "#fff",
        border: "1px solid rgba(67,36,103,0.06)",
        boxShadow: "0 12px 30px -20px rgba(67,36,103,0.2)",
        direction: "rtl",
        textAlign: "right",
      }}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: r.rating }).map((_, j) => (
          <StarFilled key={j} size={18} color="#F58762" />
        ))}
      </div>
      <p className="text-lg leading-relaxed font-medium flex-1" style={{ color: "#1B0E2B" }}>
        "{r.text}"
      </p>
      <div
        className="flex items-center gap-3 pt-5"
        style={{ borderTop: "1px solid rgba(67,36,103,0.08)" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-base"
          style={{ background: "linear-gradient(135deg, #F58762, #C95FA0)" }}
        >
          {r.name[0]}
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-extrabold" style={{ color: "#1B0E2B" }}>{r.name}</div>
          <div className="text-xs flex items-center gap-1" style={{ color: "#6B5575" }}>
            <Icon name="location" size={11} color="#9E8AAE" strokeWidth={1.8} />
            {r.loc}
          </div>
        </div>
        <div
          className="text-xs font-bold px-2 py-1 rounded-md"
          style={{ background: "rgba(67,36,103,0.06)", color: "#432467" }}
        >
          {r.level}
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FBF6F1 0%, #FCDDD0 100%)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
        <SectionLabel num="٠٦" title="آراء المستخدمين" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-black leading-[1.35] tracking-tighter max-w-3xl"
          style={{ fontSize: "clamp(32px, 4vw, 58px)", color: "#1B0E2B" }}
        >
          تقييمات حقيقية،
          <br />
          من <span className="grad-text">ناس حقيقيين.</span>
        </motion.h2>
      </div>

      {/* Marquee track */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to left, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to left, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="reviews-track flex gap-5 py-5"
          style={{ direction: "ltr" }}
        >
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
