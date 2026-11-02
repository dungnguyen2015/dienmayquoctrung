import Link from "next/link";
import { query } from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức & Kinh nghiệm điện máy",
  description: "Tổng hợp kinh nghiệm chọn mua, sử dụng và bảo quản thiết bị điện lạnh, điện gia dụng cũ uy tín.",
};

export const dynamic = "force-dynamic";

interface PostItem {
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  published_at: Date | null;
}

interface CountResult {
  total: number;
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const POSTS_PER_PAGE = 20;

export default async function PostsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const pageParam = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  let posts: PostItem[] = [];
  let totalPosts = 0;

  try {
    // 1. Lấy tổng số lượng bài viết đã xuất bản để tính số trang
    const countResult = await query<CountResult[]>(
      "SELECT COUNT(*) as total FROM posts WHERE status='published'"
    );
    totalPosts = countResult[0]?.total || 0;

    // 2. Lấy danh sách bài viết phân trang (20 bài / trang)
    posts = await query<PostItem[]>(
      "SELECT title, slug, excerpt, image_url, published_at FROM posts WHERE status='published' ORDER BY published_at DESC, created_at DESC LIMIT ? OFFSET ?",
      [POSTS_PER_PAGE, offset]
    );
  } catch (error) {
    console.error("Lỗi khi tải danh sách bài viết:", error);
  }

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-slate-50 text-slate-800">
        {/* Breadcrumb & Heading Header Section */}
        <div className="bg-white border-b border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <nav className="text-xs text-slate-500 font-medium flex items-center gap-2">
              <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Tin tức & Kinh nghiệm</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Tin Tức & Kinh Nghiệm Điện Máy
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Chia sẻ kiến thức thực tế giúp bạn chọn mua, sử dụng và bảo quản tủ lạnh, máy giặt, máy lạnh cũ bền bỉ và tiết kiệm điện.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8">
              <p className="text-base font-semibold text-slate-700 mb-2">Chưa có bài viết được xuất bản.</p>
              <p className="text-xs text-slate-500">Vui lòng quay lại sau khi hệ thống cập nhật nội dung mới.</p>
            </div>
          ) : (
            <>
              {/* Grid 4 cột (Mỗi hàng 4 bài) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.map((p) => (
                  <article
                    key={p.slug}
                    className="bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <Link href={`/bai-viet/${p.slug}`} className="block aspect-video w-full bg-slate-100 overflow-hidden relative">
                        {p.image_url ? (
                          <img
                            src={p.image_url}
                            alt={p.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium">
                            Điện Máy Quốc Trung
                          </div>
                        )}
                      </Link>

                      <div className="p-4 space-y-2">
                        {p.published_at && (
                          <span className="text-[11px] text-slate-400 font-medium block">
                            {new Date(p.published_at).toLocaleDateString("vi-VN")}
                          </span>
                        )}
                        <h2 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-red-600 transition-colors">
                          <Link href={`/bai-viet/${p.slug}`}>{p.title}</Link>
                        </h2>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {p.excerpt || "Đọc ngay bài viết chi tiết để có thêm kinh nghiệm hữu ích..."}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <Link
                        href={`/bai-viet/${p.slug}`}
                        className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 group/link"
                      >
                        Đọc tiếp <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Phân trang (Pagination) */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-12">
                  {/* Nút Trước */}
                  {currentPage > 1 ? (
                    <Link
                      href={`/bai-viet?page=${currentPage - 1}`}
                      className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      ← Trước
                    </Link>
                  ) : (
                    <span className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed">
                      ← Trước
                    </span>
                  )}

                  {/* Danh sách các số trang */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                    const isCurrent = pageNumber === currentPage;
                    return (
                      <Link
                        key={pageNumber}
                        href={`/bai-viet?page=${pageNumber}`}
                        className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-lg transition-colors ${
                          isCurrent
                            ? "bg-red-600 text-white shadow-sm"
                            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}

                  {/* Nút Sau */}
                  {currentPage < totalPages ? (
                    <Link
                      href={`/bai-viet?page=${currentPage + 1}`}
                      className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Sau →
                    </Link>
                  ) : (
                    <span className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed">
                      Sau →
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}