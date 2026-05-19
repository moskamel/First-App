import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "سياسة الخصوصية — ريفيوز" };

export default function Privacy() {
  return (
    <main>
      <Nav />
      <section className="pt-32 pb-24 px-6 md:px-10" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-4xl font-black mb-3 tracking-tight" style={{ color: "#1B0E2B" }}>سياسة الخصوصية</h1>
          <p className="text-sm mb-12" style={{ color: "#9E8AAE" }}>آخر تحديث: مايو ٢٠٢٦</p>
          <div className="space-y-10 text-base leading-relaxed" style={{ color: "#3a2649" }}>
            {[
              { t: "١. البيانات التي نجمعها", b: "نجمع البيانات التي تقدّمها عند التسجيل (الاسم، البريد الإلكتروني)، بيانات الاستخدام (المنتجات التي تتصفحها)، وصور المسح بالكاميرا." },
              { t: "٢. كيف نستخدم بياناتك", b: "نستخدم بياناتك لتحسين تجربتك، تخصيص التوصيات، إرسال إشعارات ذات صلة، وتحليل أنماط الاستخدام لتطوير الخدمة." },
              { t: "٣. مشاركة البيانات", b: "لا نبيع بياناتك لأي طرف ثالث. نشارك بيانات محدودة مع المتاجر الشريكة فقط لإتمام عمليات الشراء، ومع مزوّدي التحليلات كـPostHog." },
              { t: "٤. أمان البيانات", b: "نستخدم تشفيراً كاملاً للبيانات الحساسة (AES-256)، وتخزيناً آمناً عبر Expo Secure Store على جهازك." },
              { t: "٥. حقوقك", b: "يحق لك طلب الاطلاع على بياناتك، تصحيحها، أو حذفها في أي وقت من خلال إعدادات التطبيق أو بالتواصل معنا." },
              { t: "٦. التواصل بشأن الخصوصية", b: "لأي استفسار متعلق بخصوصيتك، راسلنا على privacy@reviyoz.com أو من خلال قسم الدعم في التطبيق." },
            ].map((s) => (
              <div key={s.t}>
                <h2 className="text-xl font-extrabold mb-3" style={{ color: "#1B0E2B" }}>{s.t}</h2>
                <p>{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
