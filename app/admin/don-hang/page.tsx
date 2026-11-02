import { query } from "@/lib/db";
import OrderStatusSelector from "./OrderStatusSelector"; // Component xử lý đổi trạng thái Client-side

export const dynamic = "force-dynamic";

type OrderRow = {
  id: number;
  customer_name: string;
  phone: string;
  message: string | null;
  status: "pending" | "contacted" | "completed" | "cancelled" | string;
  created_at: Date | string;
  product_name: string | null;
};

export default async function AdminOrdersPage() {
  let rows: OrderRow[] = [];
  
  try {
    rows = await query<OrderRow[]>(
      `SELECT 
        o.id, 
        o.customer_name, 
        o.phone, 
        o.message, 
        o.status, 
        o.created_at, 
        p.name AS product_name 
       FROM contact_orders o 
       LEFT JOIN products p ON p.id = o.product_id 
       ORDER BY o.created_at DESC 
       LIMIT 200`
    );
  } catch (error) {
    console.error("Lỗi khi tải danh sách yêu cầu tư vấn:", error);
  }

  // Thống kê nhanh
  const pendingCount = rows.filter((r) => r.status === "pending" || !r.status).length;
  const contactedCount = rows.filter((r) => r.status === "contacted").length;
  const completedCount = rows.filter((r) => r.status === "completed").length;

  return (
    <div className="space-y-6 font-sans">
      {/* Tiêu đề trang & Mô tả */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📞</span> Quản Lý Yêu Cầu Tư Vấn
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Danh sách khách hàng để lại thông tin tư vấn và đặt mua sản phẩm từ website.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 bg-amber-50 text-amber-700 font-bold border border-amber-200 rounded-xl">
            Chờ xử lý: {pendingCount}
          </span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold border border-blue-200 rounded-xl">
            Đã tư vấn: {contactedCount}
          </span>
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-xl">
            Hoàn thành: {completedCount}
          </span>
        </div>
      </div>

      {/* Bảng danh sách yêu cầu */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            Danh sách yêu cầu gần đây ({rows.length})
          </h2>
          <span className="text-[11px] text-slate-400">Hiển thị tối đa 200 mục mới nhất</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 w-16">ID</th>
                <th className="py-3.5 px-4">Khách hàng</th>
                <th className="py-3.5 px-4">Sản phẩm quan tâm</th>
                <th className="py-3.5 px-4 max-w-xs">Nội dung ghi chú</th>
                <th className="py-3.5 px-4 w-40">Trạng thái</th>
                <th className="py-3.5 px-4 w-36">Thời gian</th>
                <th className="py-3.5 px-4 text-right w-28">Hành động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    Chưa có yêu cầu tư vấn nào từ khách hàng.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* ID */}
                    <td className="py-3.5 px-4 font-bold text-slate-400">#{r.id}</td>

                    {/* Khách hàng */}
                    <td className="py-3.5 px-4 space-y-1">
                      <div className="font-bold text-slate-900 text-sm">
                        {r.customer_name}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${r.phone}`}
                          className="font-mono text-red-600 hover:text-red-700 font-bold hover:underline"
                        >
                          {r.phone}
                        </a>
                      </div>
                    </td>

                    {/* Sản phẩm */}
                    <td className="py-3.5 px-4">
                      {r.product_name ? (
                        <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 inline-block max-w-xs truncate">
                          {r.product_name}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Tư vấn chung</span>
                      )}
                    </td>

                    {/* Nội dung */}
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                      {r.message ? (
                        <p className="line-clamp-2 leading-relaxed">{r.message}</p>
                      ) : (
                        <span className="text-slate-300 italic">Không có ghi chú</span>
                      )}
                    </td>

                    {/* Trạng thái (Component đổi trạng thái) */}
                    <td className="py-3.5 px-4">
                      <OrderStatusSelector orderId={r.id} initialStatus={r.status || "pending"} />
                    </td>

                    {/* Ngày tạo */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(r.created_at).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Nút thao tác nhanh */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${r.phone}`}
                          className="p-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-lg transition-colors border border-emerald-200"
                          title="Gọi điện"
                        >
                          📞
                        </a>
                        <a
                          href={`https://zalo.me/${r.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-colors border border-blue-200 font-bold text-[10px]"
                          title="Mở Chat Zalo"
                        >
                          Zalo
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}