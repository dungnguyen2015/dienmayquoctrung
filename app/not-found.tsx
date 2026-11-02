// app/not-found.tsx
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh] bg-slate-50 flex items-center justify-center py-16 px-4 font-sans text-slate-800">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs space-y-5">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl font-black mx-auto">
            404
          </div>
          
          <div className="space-y-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Không Tìm Thấy Trang
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bài viết hoặc trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc chưa được xuất bản.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
            >
              Về trang chủ
            </Link>
            <Link
              href="/bai-viet"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-all border border-slate-200"
            >
              Xem các bài viết khác
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}