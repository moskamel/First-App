"use client";
import { motion } from "framer-motion";

interface SectionLabelProps {
  num: string;
  title: string;
  color?: string;
}

export default function SectionLabel({ num, title, color = "#C95FA0" }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-3 mb-7 px-5 py-2 rounded-full"
      style={{
        background: "rgba(255,255,255,0.4)",
        border: `1px solid ${color}33`,
      }}
    >
      <span
        className="font-[family-name:var(--font-mono)] text-[13px] font-bold tracking-widest"
        style={{ color }}
      >
        {num}
      </span>
      <span className="w-6 h-px opacity-50" style={{ background: color }} />
      <span className="text-[15px] font-bold tracking-widest" style={{ color }}>
        {title}
      </span>
    </motion.div>
  );
}
