import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin-login");

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-800">
      {/* Sidebar quản trị */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Logo / Brand */}
          <div className="p-6 border-b border-slate-800">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="w-9 h-9 bg-red-600 text-white font-black rounded-lg flex items-center justify-center text-base shadow-md">
                QT
              </span>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-sm tracking-wide">QUỐC TRUNG</span>
                <span className="text-red-400 text-[10px] font-semibold tracking-wider">QUẢN TRỊ HỆ THỐNG</span>
              </div>
            </Link>
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <p className="text-xs text-slate-400 truncate" title={session.email}>
                Xin chào, <span className="text-slate-200 font-medium">{session.email}</span>
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1.5 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <span>📊</span> Tổng quan
            </Link>
            <Link
              href="/admin/san-pham"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <span>📦</span> Sản phẩm
            </Link>
            <Link
              href="/admin/media"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <span>🖼️</span> Thư viện ảnh
            </Link>
            <Link
              href="/admin/danh-muc"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <span>📁</span> Danh mục
            </Link>
            <Link
              href="/admin/bai-viet"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <span>📝</span> Bài viết
            </Link>
            <Link
              href="/admin/don-hang"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <span>🔔</span> Yêu cầu tư vấn
            </Link>
          </nav>
        </div>

        {/* Footer Sidebar / Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/40 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              🚪 Đăng xuất hệ thống
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-slate-800">Khu vực quản trị Điện Máy Quốc Trung</h1>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors inline-flex items-center gap-1"
          >
            Xem website ngoài ↗
          </Link>
        </header>

        <div className="p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}