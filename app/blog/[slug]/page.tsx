import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const slugs = ["ai-product-scanning", "save-money-shopping", "ramadan-deals-2026", "rewards-guide"];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main>
      <Nav />
      <section className="pt-32 pb-24 px-6 md:px-10" style={{ background: "#FBF6F1" }}>
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold mb-10 transition-opacity hover:opacity-70"
            style={{ color: "#C95FA0" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            العودة للمدوّنة
          </Link>

          <div
            className="w-full h-56 rounded-3xl mb-10 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FCDDD0, #E5D4F2)" }}
          >
            <div className="text-6xl">📝</div>
          </div>

          <div className="flex items-center gap-3 text-sm mb-6" style={{ color: "#9E8AAE" }}>
            <span>مايو ٢٠٢٦</span>
            <span>•</span>
            <span>قراءة ٥ دقائق</span>
          </div>

          <h1 className="text-4xl font-black mb-6 tracking-tight leading-tight" style={{ color: "#1B0E2B" }}>
            مقالة المدوّنة
          </h1>

          <div className="space-y-5 text-lg leading-relaxed" style={{ color: "#3a2649" }}>
            <p>
              هذا مثال على محتوى مقالة المدوّنة. في النسخة الكاملة من الموقع، سيتم تحميل
              المحتوى ديناميكياً من نظام إدارة المحتوى (CMS) أو قاعدة بيانات Supabase.
            </p>
            <p>
              يمكن تكامل هذه الصفحة مع Sanity أو Contentful أو Supabase لعرض مقالات حقيقية
              بمحتوى غني يدعم اللغة العربية والـ RTL.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
