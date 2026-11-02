"use client";

import { useState } from "react";

export default function ContactForm({
  productId,
  productName,
}: {
  productId?: number;
  productName?: string;
}) {
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    setIsSuccess(false);

    // 1. Lưu lại tham chiếu form trước khi thực hiện await fetch
    const formElement = e.currentTarget;

    const form = new FormData(formElement);
    const data: Record<string, any> = Object.fromEntries(form.entries());
    
    if (productId) {
      data.product_id = String(productId);
    }

    try {
      const r = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json();

      if (!r.ok) throw new Error(j.error || "Không gửi được thông tin.");

      setIsSuccess(true);
      setMsg("Đã gửi yêu cầu thành công! Cửa hàng sẽ liên hệ với bạn trong thời gian sớm nhất.");
      
      // 2. Gọi reset trên biến formElement đã lưu sẵn
      formElement.reset();
    } catch (err) {
      setIsSuccess(false);
      setMsg(err instanceof Error ? err.message : "Có lỗi xảy ra.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 font-sans">
      {/* Thông báo trạng thái */}
      {msg && (
        <div
          role="status"
          className={`p-3.5 rounded-xl text-xs font-semibold border ${
            isSuccess
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-600"
          }`}
        >
          {isSuccess ? "✓ " : "⚠️ "}
          {msg}
        </div>
      )}

      {/* Trường Họ tên */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Họ tên của bạn <span className="text-red-600">*</span>
        </label>
        <input
          name="customer_name"
          required
          minLength={2}
          maxLength={160}
          placeholder="Ví dụ: Nguyễn Văn A"
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
        />
      </div>

      {/* Trường Số điện thoại */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Số điện thoại liên hệ <span className="text-red-600">*</span>
        </label>
        <input
          name="phone"
          required
          maxLength={40}
          pattern="[0-9+() .-]{8,40}"
          placeholder="Ví dụ: 0932383966"
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
        />
      </div>

      {/* Trường Nội dung / Lời nhắn */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Nội dung yêu cầu / Ghi chú
        </label>
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          defaultValue={
            productName ? `Tôi muốn hỏi về sản phẩm: ${productName}` : ""
          }
          placeholder="Nhập yêu cầu cần tư vấn về sản phẩm, tình trạng, giá cả..."
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
        />
      </div>

      {/* Nút Gửi */}
      <button
        type="submit"
        disabled={busy}
        className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {busy ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang gửi thông tin...
          </>
        ) : (
          "Gửi yêu cầu tư vấn"
        )}
      </button>
    </form>
  );
}