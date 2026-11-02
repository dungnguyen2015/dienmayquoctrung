"use client";

import { useEffect, useState } from "react";

export type MediaImage = {
  id: number;
  public_id: string;
  image_url: string;
  alt_text: string;
  width?: number | null;
  height?: number | null;
  format?: string | null;
  bytes?: number | null;
  created_at?: string;
};

type Props = {
  picker?: boolean;
  onSelect?: (image: MediaImage) => void;
  onClose?: () => void;
};

export default function MediaLibrary({
  picker = false,
  onSelect,
  onClose,
}: Props) {
  const [images, setImages] = useState<MediaImage[]>([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState("");
  const [editingAlt, setEditingAlt] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    try {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      const response = await fetch(
        `/api/admin/media?${params.toString()}`,
        { cache: "no-store" }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Không tải được thư viện ảnh.");
      }

      setImages(json.data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
    }
  }

  useEffect(() => {
    load();
  }, [search]);

  async function upload() {
    if (!file) {
      setError("Vui lòng chọn ảnh.");
      return;
    }

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("alt_text", uploadAlt);

      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: data,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Tải ảnh thất bại.");
      }

      setFile(null);
      setUploadAlt("");
      setNotice("Tải ảnh lên thành công.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tải ảnh thất bại.");
    } finally {
      setBusy(false);
    }
  }

  async function saveAlt(image: MediaImage) {
    const alt = editingAlt[image.id] ?? image.alt_text;

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `/api/admin/media/${image.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ alt_text: alt }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Không cập nhật được ALT.");
      }

      setNotice("Đã cập nhật ALT.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(image: MediaImage) {
    const confirmed = window.confirm(
      "Xóa ảnh này khỏi Cloudinary và thư viện? Nếu sản phẩm hoặc bài viết đang dùng ảnh này, ảnh cũng sẽ không còn hiển thị."
    );

    if (!confirmed) return;

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `/api/admin/media/${image.id}`,
        { method: "DELETE" }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Không xóa được ảnh.");
      }

      setNotice("Đã xóa ảnh.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
    } finally {
      setBusy(false);
    }
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setNotice("Đã sao chép URL ảnh.");
    } catch {
      setError("Không thể sao chép URL trên trình duyệt này.");
    }
  }

  const content = (
    <div className="space-y-6">
      {/* Thông báo Notice / Error */}
      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center justify-between shadow-xs">
          <span>✓ {notice}</span>
          <button type="button" onClick={() => setNotice("")} className="text-emerald-500 hover:text-emerald-800">✕</button>
        </div>
      )}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl flex items-center justify-between shadow-xs">
          <span>⚠️ {error}</span>
          <button type="button" onClick={() => setError("")} className="text-red-400 hover:text-red-700">✕</button>
        </div>
      )}

      {/* Thanh tìm kiếm & Tải ảnh mới */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div className="space-y-1.5 md:col-span-3">
          <input
            type="search"
            placeholder="🔍 Tìm kiếm theo nội dung ALT hình ảnh..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>

        <div className="space-y-1.5 md:col-span-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Chọn tệp ảnh
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5 md:col-span-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            ALT mô tả hình ảnh
          </label>
          <input
            type="text"
            maxLength={500}
            placeholder="Nhập ALT mô tả..."
            value={uploadAlt}
            onChange={(e) => setUploadAlt(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>

        <div className="md:col-span-1">
          <button
            type="button"
            disabled={busy || !file}
            onClick={upload}
            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {busy ? "Đang tải lên..." : "⬆ Tải ảnh lên"}
          </button>
        </div>
      </div>

      {/* Lưới danh sách ảnh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <article
            key={image.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-video w-full bg-slate-100 overflow-hidden relative border-b border-slate-100">
                <img
                  src={image.image_url}
                  alt={image.alt_text}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>{image.width || "?"} × {image.height || "?"} px</span>
                  <span className="uppercase bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-600">
                    {image.format || "IMG"}
                  </span>
                </div>

                <input
                  type="text"
                  maxLength={500}
                  aria-label={`ALT ảnh ${image.id}`}
                  placeholder="Nhập ALT..."
                  value={editingAlt[image.id] ?? image.alt_text}
                  onChange={(e) =>
                    setEditingAlt((old) => ({
                      ...old,
                      [image.id]: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="p-3.5 pt-0 grid grid-cols-2 gap-1.5">
              {picker && (
                <button
                  type="button"
                  onClick={() => onSelect?.(image)}
                  className="col-span-2 py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] rounded-lg transition-colors shadow-xs"
                >
                  ✓ Chọn ảnh này
                </button>
              )}

              <button
                type="button"
                onClick={() => copyUrl(image.image_url)}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-colors border border-slate-200"
              >
                Sao chép URL
              </button>

              <button
                type="button"
                disabled={busy}
                onClick={() => saveAlt(image)}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-colors border border-slate-200"
              >
                Lưu ALT
              </button>

              <button
                type="button"
                disabled={busy}
                onClick={() => remove(image)}
                className="col-span-2 py-1.5 px-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[11px] rounded-lg transition-colors border border-red-200"
              >
                Xóa ảnh
              </button>
            </div>
          </article>
        ))}

        {images.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">
            Chưa có ảnh nào trong thư viện.
          </div>
        )}
      </div>
    </div>
  );

  if (!picker) return content;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chọn ảnh từ thư viện"
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold">Thư Viện Ảnh - Chọn Ảnh</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center font-bold text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {content}
        </div>
      </div>
    </div>
  );
}