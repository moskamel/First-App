"use client";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Icon from "@/components/ui/Icons";

const cats = [
  { name: "الأجهزة والتقنية", count: "١٢٣٤٠", icon: "monitor", color: "#FCDDD0" },
  { name: "الملابس والأناقة", count: "٨٢١٠", icon: "shopBag", color: "#E5D4F2" },
  { name: "العناية الشخصية", count: "٤٥٢٠", icon: "magicStar", color: "#FCDDD0" },
  { name: "المستلزمات المنزلية", count: "٦٧٨٠", icon: "home", color: "#E5D4F2" },
  { name: "المعدات الرياضية", count: "٢٣٤٠", icon: "cup", color: "#FCDDD0" },
  { name: "الكتب والثقافة", count: "٥٦٧٠", icon: "documentText", color: "#E5D4F2" },
  { name: "الأطعمة والمشروبات", count: "٣٤٥٠", icon: "shop", color: "#FCDDD0" },
  { name: "مستلزمات الأطفال", count: "٢٨٩٠", icon: "heart", color: "#E5D4F2" },
];

export default function Categories() {
  return (
    <section
      id="categories"
      className="px-6 md:px-10 py-32 relative"
      style={{ background: "#FBF6F1" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-16 flex-wrap gap-8">
          <div>
            <SectionLabel num="٠٣" title="التصنيفات" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-black leading-[1.35] tracking-tighter"
              style={{ fontSize: "clamp(44px, 5vw, 84px)", color: "#1B0E2B" }}
            >
              كل ما تحتاج،
              <br />
              <span className="italic font-light">في ثمانية أقسام.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-md"
            style={{ color: "#6B5575" }}
          >
            من أحدث الإلكترونيات إلى مستلزمات الأطفال — تصفّح، فلتر، وقارن في تصنيفات منظّمة بعناية.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl p-6 min-h-[220px] flex flex-col justify-between cursor-pointer"
              style={{
                background: c.color,
                border: "1px solid rgba(67,36,103,0.06)",
                color: "#1B0E2B",
              }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-[18px] flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.6)" }}
              >
                <Icon name={c.icon} size={32} color="#432467" strokeWidth={1.6} />
              </div>

              {/* Text */}
              <div>
                <div className="text-xl font-extrabold mb-1 leading-tight" style={{ color: "#1B0E2B" }}>
                  {c.name}
                </div>
                <div className="text-sm" style={{ color: "#6B5575" }}>
                  <span className="mono">{c.count}</span> منتج
                </div>
              </div>

              {/* Arrow */}
              <div
                className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#1B0E2B]"
                style={{ background: "rgba(255,255,255,0.7)" }}
              >
                <Icon name="arrowLeft" size={14} color="#1B0E2B" strokeWidth={2.2} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
