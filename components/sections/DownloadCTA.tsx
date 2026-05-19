"use client";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { AppStoreBtn, GooglePlayBtn } from "@/components/ui/AppStoreButtons";

export default function DownloadCTA() {
  return (
    <section
      className="relative overflow-hidden px-6 md:px-10 py-36 text-white"
      style={{ background: "linear-gradient(135deg, #F58762 0%, #C95FA0 50%, #432467 100%)" }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none font-black leading-none tracking-tighter"
        style={{
          fontSize: "clamp(140px, 22vw, 340px)",
          color: "rgba(255,255,255,0.08)",
          whiteSpace: "nowrap",
        }}
      >
        ريفيوز
      </div>

      <div className="max-w-[1100px] mx-auto relative text-center">
        <div className="inline-block mb-4">
          <SectionLabel num="٠٧" title="متاح الآن" color="#FCDDD0" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-black leading-[1.3] tracking-tighter mb-7"
          style={{ fontSize: "clamp(52px, 7vw, 110px)" }}
        >
          حمّل ريفيوز.<br />
          ابدأ التوفير اليوم.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl leading-relaxed max-w-lg mx-auto mb-12"
          style={{ opacity: 0.9 }}
        >
          مجاني تماماً. متاح على آيفون و أندرويد. تجربة عربية أصيلة بكل التفاصيل.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <AppStoreBtn size="lg" theme="dark" />
          <GooglePlayBtn size="lg" theme="light" />
        </motion.div>
      </div>
    </section>
  );
}
