"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <Nav />

      <section
        className="pt-32 pb-20 px-6 md:px-10"
        style={{ background: "linear-gradient(180deg, #E5D4F2 0%, #FBF6F1 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-8"
              style={{ background: "rgba(67,36,103,0.1)", color: "#432467" }}
            >
              تواصل معنا
            </div>
            <h1
              className="font-black tracking-tighter leading-[1.3] mb-6"
              style={{ fontSize: "clamp(44px, 5vw, 80px)", color: "#1B0E2B" }}
            >
              نحن هنا<br />
              <span className="grad-text">لنساعدك.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "#3a2649" }}>
              لأي استفسار أو اقتراح أو شراكة — فريقنا جاهز للرد خلال ٢٤ ساعة.
            </p>

            <div className="space-y-5">
              {[
                { label: "البريد الإلكتروني", value: "hello@reviyoz.com", icon: "📧" },
                { label: "واتساب", value: "+20 100 000 0000", icon: "📱" },
                { label: "العنوان", value: "القاهرة، مصر", icon: "📍" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "#9E8AAE" }}>{item.label}</div>
                    <div className="text-base font-semibold" style={{ color: "#1B0E2B" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="rounded-3xl p-8"
              style={{ background: "#fff", border: "1px solid rgba(67,36,103,0.06)" }}
            >
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: "#1B0E2B" }}>تم الإرسال!</h3>
                  <p style={{ color: "#6B5575" }}>سنرد عليك خلال ٢٤ ساعة.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-black mb-6" style={{ color: "#1B0E2B" }}>أرسل رسالة</h3>
                  {[
                    { label: "الاسم الكامل", type: "text", placeholder: "محمد أحمد" },
                    { label: "البريد الإلكتروني", type: "email", placeholder: "you@example.com" },
                  ].map((f, i) => (
                    <div key={i}>
                      <label className="block text-sm font-bold mb-2" style={{ color: "#1B0E2B" }}>
                        {f.label}
                      </label>
                      <input
                        required
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full rounded-xl px-4 py-3 text-base outline-none transition-all"
                        style={{
                          background: "#FBF6F1",
                          border: "1px solid rgba(67,36,103,0.12)",
                          color: "#1B0E2B",
                          direction: f.type === "email" ? "ltr" : "rtl",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#C95FA0")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(67,36,103,0.12)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: "#1B0E2B" }}>
                      الرسالة
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full rounded-xl px-4 py-3 text-base outline-none transition-all resize-none"
                      style={{
                        background: "#FBF6F1",
                        border: "1px solid rgba(67,36,103,0.12)",
                        color: "#1B0E2B",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#C95FA0")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(67,36,103,0.12)")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-base text-white transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #F58762, #C95FA0)" }}
                  >
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
