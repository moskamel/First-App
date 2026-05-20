import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "شروط الاستخدام — ريفيوز" };

export default function Terms() {
  return (
    <main>
      <Nav />
      <section className="pt-32 pb-24 px-6 md:px-10" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-4xl font-black mb-3 tracking-tight" style={{ color: "#1B0E2B" }}>شروط الاستخدام</h1>
          <p className="text-sm mb-12" style={{ color: "#9E8AAE" }}>آخر تحديث: مايو ٢٠٢٦</p>
          <div className="space-y-10 text-base leading-relaxed" style={{ color: "#3a2649" }}>
            {[
              { t: "١. القبول بالشروط", b: "باستخدامك لتطبيق ريفيوز أو موقعه الإلكتروني، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي بند، يُرجى عدم استخدام الخدمة." },
              { t: "٢. الخدمة المقدّمة", b: "يوفّر ريفيوز منصة لمقارنة أسعار المنتجات وقراءة المراجعات. نحن لا نبيع المنتجات مباشرة، بل نوجّهك إلى المتاجر الشريكة." },
              { t: "٣. حسابات المستخدمين", b: "أنت مسؤول عن الحفاظ على سرية بيانات حسابك. يُحظر استخدام الحساب لأغراض غير مشروعة أو نشر محتوى مسيء أو مضلل." },
              { t: "٤. المحتوى الذي ترفعه", b: "تُقرّ بأن المراجعات والصور التي ترفعها تعكس تجربتك الحقيقية، وأنك تمنح ريفيوز ترخيصاً لاستخدامها ونشرها على المنصة." },
              { t: "٥. الملكية الفكرية", b: "جميع محتويات ريفيوز (التصميم، الكود، الشعار) محمية بموجب قوانين الملكية الفكرية. لا يجوز نسخها أو استخدامها دون إذن كتابي." },
              { t: "٦. التغييرات على الشروط", b: "نحتفظ بحق تعديل هذه الشروط في أي وقت. سنُخطرك بأي تغييرات جوهرية عبر التطبيق أو البريد الإلكتروني." },
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
