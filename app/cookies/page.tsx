import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "سياسة ملفات تعريف الارتباط — ريفيوز" };

export default function Cookies() {
  return (
    <main>
      <Nav />
      <section className="pt-32 pb-24 px-6 md:px-10" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-4xl font-black mb-3 tracking-tight" style={{ color: "#1B0E2B" }}>
            سياسة ملفات تعريف الارتباط
          </h1>
          <p className="text-sm mb-12" style={{ color: "#9E8AAE" }}>آخر تحديث: مايو ٢٠٢٦</p>
          <div className="space-y-10 text-base leading-relaxed" style={{ color: "#3a2649" }}>
            {[
              { t: "ما هي ملفات تعريف الارتباط؟", b: "ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة تُخزَّن على جهازك عند زيارة موقعنا. تساعدنا في تذكّر تفضيلاتك وتحسين تجربتك." },
              { t: "الملفات الضرورية", b: "هذه الملفات ضرورية لعمل الموقع ولا يمكن إيقافها. تشمل جلسات تسجيل الدخول وإعدادات اللغة والمنطقة." },
              { t: "ملفات التحليل", b: "نستخدم PostHog لتتبع كيفية استخدامك للموقع (مثل الصفحات الأكثر زيارة). هذه البيانات مجهولة الهوية وتساعدنا في تحسين الخدمة." },
              { t: "التحكم في الملفات", b: "يمكنك إدارة أو حذف ملفات تعريف الارتباط من إعدادات متصفحك في أي وقت. قد يؤثر ذلك على بعض وظائف الموقع." },
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
