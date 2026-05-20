"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const posts = [
  {
    slug: "ai-product-scanning",
    cat: "تقنية",
    date: "١٥ مايو ٢٠٢٦",
    title: "كيف يتعرّف ريفيوز على المنتجات بالكاميرا؟",
    excerpt: "شرح مبسّط لتقنية Google Gemini AI التي تجعل مسح المنتجات بالكاميرا سريعاً ودقيقاً.",
    readTime: "٥ دقائق",
    color: "#FCDDD0",
  },
  {
    slug: "save-money-shopping",
    cat: "تسوّق ذكي",
    date: "١٠ مايو ٢٠٢٦",
    title: "١٠ طرق لتوفير المال عند التسوق الإلكتروني في مصر",
    excerpt: "نصائح عملية من خبرات مستخدمي ريفيوز لتحقيق أكبر توفير عند شراء الإلكترونيات والملابس.",
    readTime: "٨ دقائق",
    color: "#E5D4F2",
  },
  {
    slug: "ramadan-deals-2026",
    cat: "عروض",
    date: "٢ مايو ٢٠٢٦",
    title: "أفضل عروض رمضان ٢٠٢٦ — دليل شامل",
    excerpt: "رصدنا أفضل العروض والخصومات الرمضانية من أكبر المتاجر لتساعدك على التسوق بذكاء.",
    readTime: "١٠ دقائق",
    color: "#FCDDD0",
  },
  {
    slug: "rewards-guide",
    cat: "نظام النقاط",
    date: "٢٥ أبريل ٢٠٢٦",
    title: "دليل كامل لنظام نقاط ريفيوز — كيف تصل لمستوى خبير؟",
    excerpt: "كل ما تحتاج معرفته عن نظام المكافآت والمستويات وكيف تجمع أكبر عدد من النقاط.",
    readTime: "٦ دقائق",
    color: "#E5D4F2",
  },
];

export default function Blog() {
  return (
    <main>
      <Nav />

      <section
        className="pt-32 pb-16 px-6 md:px-10"
        style={{ background: "linear-gradient(180deg, #FCDDD0 0%, #FBF6F1 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="font-black tracking-tighter leading-[1.3] mb-6"
              style={{ fontSize: "clamp(52px, 6vw, 88px)", color: "#1B0E2B" }}
            >
              المدوّنة
            </h1>
            <p className="text-xl leading-relaxed max-w-xl" style={{ color: "#3a2649" }}>
              نصائح التسوق الذكي، أخبار التقنية، وآخر مستجدات ريفيوز.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${p.slug}`}
                className="block rounded-3xl overflow-hidden group cursor-pointer"
                style={{ background: "#fff", border: "1px solid rgba(67,36,103,0.06)" }}
              >
                {/* Color header */}
                <div
                  className="h-48 flex items-end p-6"
                  style={{ background: p.color }}
                >
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: "rgba(27,14,43,0.1)", color: "#1B0E2B" }}
                  >
                    {p.cat}
                  </span>
                </div>
                {/* Content */}
                <div className="p-6">
                  <div
                    className="flex items-center gap-3 text-xs mb-4"
                    style={{ color: "#9E8AAE" }}
                  >
                    <span>{p.date}</span>
                    <span>•</span>
                    <span>قراءة {p.readTime}</span>
                  </div>
                  <h2
                    className="text-2xl font-extrabold mb-3 leading-tight group-hover:text-[#C95FA0] transition-colors"
                    style={{ color: "#1B0E2B" }}
                  >
                    {p.title}
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: "#6B5575" }}>{p.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
