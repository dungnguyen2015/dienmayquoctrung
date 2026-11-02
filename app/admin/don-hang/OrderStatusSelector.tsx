"use client";

import { useState } from "react";

export default function OrderStatusSelector({
  orderId,
  initialStatus,
}: {
  orderId: number;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [busy, setBusy] = useState(false);

  async function updateStatus(newStatus: string) {
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!r.ok) {
        throw new Error("Cập nhật thất bại");
      }

      setStatus(newStatus);
    } catch {
      alert("Không thể cập nhật trạng thái yêu cầu!");
    } finally {
      setBusy(false);
    }
  }

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 border-amber-300",
    contacted: "bg-blue-100 text-blue-800 border-blue-300",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-300",
    cancelled: "bg-slate-100 text-slate-500 border-slate-300",
  };

  return (
    <select
      disabled={busy}
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 ${
        statusStyles[status] || "bg-slate-100 text-slate-700 border-slate-300"
      }`}
    >
      <option value="pending">⏳ Chờ xử lý</option>
      <option value="contacted">📞 Đã tư vấn</option>
      <option value="completed">✓ Hoàn thành</option>
      <option value="cancelled">✕ Đã hủy</option>
    </select>
  );
}