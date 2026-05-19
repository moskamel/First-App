"use client";
import { motion } from "framer-motion";

interface PhoneFrameProps {
  children: React.ReactNode;
  glow?: boolean;
  tilt?: number;
  className?: string;
  delay?: number;
}

export default function PhoneFrame({ children, glow = false, tilt = 0, className = "", delay = 0 }: PhoneFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className={`relative ${className}`}
      style={{
        width: 260,
        height: 540,
        filter: glow
          ? "drop-shadow(0 40px 60px rgba(245,135,98,0.35))"
          : "drop-shadow(0 30px 50px rgba(67,36,103,0.3))",
        transform: `rotate(${tilt}deg)`,
      }}
    >
      {/* Phone shell */}
      <div
        className="absolute inset-0 rounded-[40px]"
        style={{
          background: "linear-gradient(145deg, #2d1a4a, #1B0E2B)",
          border: "2px solid rgba(255,255,255,0.15)",
          boxShadow: glow
            ? "inset 0 0 40px rgba(245,135,98,0.1), 0 0 0 1px rgba(245,135,98,0.2)"
            : "inset 0 0 40px rgba(255,255,255,0.05)",
        }}
      />
      {/* Side button */}
      <div
        className="absolute rounded-r-sm"
        style={{
          left: -3,
          top: 120,
          width: 3,
          height: 50,
          background: "rgba(255,255,255,0.2)",
        }}
      />
      {/* Volume buttons */}
      <div
        className="absolute rounded-l-sm"
        style={{ right: -3, top: 100, width: 3, height: 32, background: "rgba(255,255,255,0.15)" }}
      />
      <div
        className="absolute rounded-l-sm"
        style={{ right: -3, top: 144, width: 3, height: 32, background: "rgba(255,255,255,0.15)" }}
      />
      {/* Screen */}
      <div
        className="absolute overflow-hidden rounded-[34px]"
        style={{ inset: 8 }}
      >
        {children}
      </div>
      {/* Notch */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: 90, height: 6, background: "rgba(0,0,0,0.6)" }}
      />
    </motion.div>
  );
}

export function ScanScreen() {
  return (
    <div
      className="w-full h-full flex flex-col relative"
      style={{ background: "linear-gradient(180deg, #0f0820 0%, #1B0E2B 100%)" }}
    >
      {/* Camera viewfinder */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        <div className="w-full aspect-square rounded-2xl overflow-hidden relative" style={{ maxWidth: 200 }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(245,135,98,0.15), rgba(67,36,103,0.3))" }} />
          {/* Corner brackets */}
          {[
            "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg",
            "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
            "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
            "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
          ].map((c, i) => (
            <div key={i} className={`absolute w-8 h-8 ${c}`} style={{ borderColor: "#F58762" }} />
          ))}
          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-0.5 pulse-glow"
            style={{
              top: "50%",
              background: "linear-gradient(to right, transparent, #F58762, transparent)",
            }}
          />
          {/* Product placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <div className="text-xs font-bold" style={{ color: "#F58762", fontFamily: "monospace" }}>
                SCANNING...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result card */}
      <div className="px-3 pb-4 space-y-2">
        <div
          className="rounded-2xl p-3"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="text-xs font-bold mb-1" style={{ color: "#F58762", fontFamily: "monospace" }}>
            تم التعرف على المنتج ✓
          </div>
          <div className="text-sm font-bold text-white">Samsung Galaxy S25</div>
          <div className="text-xs mt-1" style={{ color: "rgba(252,221,208,0.6)" }}>
            الإلكترونيات • ١٨٠٠٠ — ٢٢٠٠٠ ج.م
          </div>
        </div>
        <div
          className="rounded-xl p-2.5 flex items-center gap-2"
          style={{ background: "linear-gradient(135deg, #F58762, #C95FA0)" }}
        >
          <span className="text-xs font-bold text-white">عرض أفضل الأسعار</span>
          <svg className="mr-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function CompareScreen() {
  const stores = [
    { name: "أمازون", price: "١٧٢٥٠", badge: "الأرخص", color: "#FF9900" },
    { name: "نون", price: "١٨٩٠٠", badge: null, color: "#FEEE00" },
    { name: "بي تك", price: "١٩٤٥٠", badge: null, color: "#E2231A" },
    { name: "جوميا", price: "٢٠١٠٠", badge: null, color: "#F68B1E" },
  ];
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: "#FBF6F1" }}
    >
      <div className="px-3 pt-4 pb-2">
        <div className="text-xs text-gray-500 mb-1">نتائج المقارنة</div>
        <div className="text-sm font-bold" style={{ color: "#1B0E2B" }}>
          iPhone 16 Pro Max 256GB
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-3 space-y-2">
        {stores.map((s, i) => (
          <div
            key={i}
            className="rounded-xl p-2.5 flex items-center gap-2"
            style={{
              background: "#fff",
              border: `1px solid ${i === 0 ? "rgba(245,135,98,0.4)" : "rgba(67,36,103,0.06)"}`,
              boxShadow: i === 0 ? "0 4px 12px -6px rgba(245,135,98,0.3)" : "none",
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
              style={{ background: s.color, color: s.color === "#FEEE00" ? "#1B0E2B" : "#fff" }}
            >
              {s.name[0]}
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold" style={{ color: "#1B0E2B" }}>{s.name}</div>
              {s.badge && (
                <div className="text-[9px] font-bold" style={{ color: "#F58762" }}>{s.badge}</div>
              )}
            </div>
            <div className="font-[family-name:var(--font-mono)] text-sm font-bold" style={{ color: i === 0 ? "#F58762" : "#1B0E2B" }}>
              {s.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
