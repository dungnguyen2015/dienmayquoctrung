import Link from "next/link";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  let p = 0, c = 0, a = 0, o = 0;
  
  try {
    const r = await query<any[]>(
      "SELECT (SELECT COUNT(*) FROM products) p, (SELECT COUNT(*) FROM categories) c, (SELECT COUNT(*) FROM posts) a, (SELECT COUNT(*) FROM contact_orders WHERE status='new') o"
    );
    p = Number(r[0].p);
    c = Number(r[0].c);
    a = Number(r[0].a);
    o = Number(r[0].o);
  } catch (error) {
    console.error("Lỗi lấy dữ liệu thống kê admin:", error);
  }

  const stats = [
    { label: "Tổng sản phẩm", count: p, href: "/admin/san-pham", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Danh mục", count: c, href: "/admin/danh-muc", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Bài viết tin tức", count: a, href: "/admin/bai-viet", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Yêu cầu tư vấn mới", count: o, href: "/admin/don-hang", color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Tiêu đề trang */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tổng Quan Hệ Thống</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Quản lý nội dung, sản phẩm và yêu cầu khách hàng của Điện Máy Quốc Trung[cite: 8].
        </p>
      </div>

      {/* Thẻ thống kê số liệu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
              <span className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center font-bold text-sm`}>
                📈
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 group-hover:text-red-600 transition-colors">
                {item.count}
              </h2>
              <span className="text-xs font-semibold text-slate-400 mt-1 inline-flex items-center gap-1">
                Xem chi tiết <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Khu vực thao tác nhanh */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Bắt Đầu Nhanh</h2>
          <p className="text-xs text-slate-500">Lựa chọn các lối tắt thường dùng để quản trị website[cite: 8].</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/admin/san-pham"
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            📦 Quản lý sản phẩm
          </Link>
          <Link
            href="/admin/bai-viet"
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            ✍️ Viết bài mới
          </Link>
          <Link
            href="/admin/danh-muc"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all border border-slate-200"
          >
            📁 Quản lý danh mục
          </Link>
        </div>
      </div>
    </div>
  );
}