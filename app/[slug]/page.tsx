import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { query } from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type Post = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: Date | null;
};

// Hàm lấy dữ liệu bài viết từ MySQL
async function getPost(slug: string): Promise<Post | null> {
  try {
    const r = await query<Post[]>(
      "SELECT * FROM posts WHERE slug = ? AND status = 'published' LIMIT 1",
      [slug]
    );
    return r[0] || null;
  } catch (error) {
    console.error("Lỗi khi truy vấn bài viết:", error);
    return null;
  }
}

// Tạo Metadata chuẩn SEO động theo bài viết
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const p = await getPost(resolvedParams.slug);

    if (!p) {
      return { title: "Không tìm thấy bài viết | Điện Máy Quốc Trung" };
    }

    return {
      title: p.meta_title || p.title,
      description: p.meta_description || p.excerpt || p.title,
      alternates: { canonical: `/bai-viet/${p.slug}` },
      openGraph: {
        type: "article",
        locale: "vi_VN",
        siteName: "Điện Máy Quốc Trung",
        title: p.title,
        description: p.excerpt || p.title,
        images: p.image_url ? [p.image_url] : [],
      },
    };
  } catch {
    return { title: "Điện Máy Quốc Trung" };
  }
}

export const dynamic = "force-dynamic";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const p = await getPost(resolvedParams.slug);

  // Nếu không tìm thấy bài viết trong DB -> Tự động gọi notFound() để Next.js trả về trang 404
  if (!p) {
    notFound();
  }

  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-slate-50 text-slate-800 py-10">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {/* Breadcrumbs */}
          <nav className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/bai-viet" className="hover:text-red-600 transition-colors">Bài viết</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold truncate max-w-xs">{p.title}</span>
          </nav>

          {/* Bài viết chi tiết */}
          <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            {/* Tiêu đề & Ngày đăng */}
            <div className="space-y-3">
              {p.published_at && (
                <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full inline-block">
                  Ngày đăng: {new Date(p.published_at).toLocaleDateString("vi-VN")}
                </span>
              )}
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {p.title}
              </h1>
            </div>

            {/* Đoạn mở đầu (Excerpt) */}
            {p.excerpt && (
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed border-l-4 border-red-600 pl-4 py-1 bg-slate-50 rounded-r-lg">
                {p.excerpt}
              </p>
            )}

            {/* Ảnh đại diện bài viết */}
            {p.image_url && (
              <div className="rounded-xl overflow-hidden shadow-md max-h-[460px] bg-slate-100">
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Nội dung HTML chính từ cơ sở dữ liệu (TinyMCE hoặc HTML Editor) */}
            <div
              className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 pt-4 border-t border-slate-100 [&_img]:rounded-xl [&_img]:shadow-md [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: p.content }}
            />
          </article>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}