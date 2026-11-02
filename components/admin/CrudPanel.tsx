"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import MediaLibrary, { type MediaImage } from "./MediaLibrary";

const TinyEditor = dynamic(() => import("./TinyEditor"), {
  ssr: false,
  loading: () => (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-medium animate-pulse">
      Đang tải trình soạn thảo...
    </div>
  ),
});

type Row = Record<string, any>;

const config: Record<
  string,
  {
    title: string;
    fields: {
      key: string;
      label: string;
      type?: string;
      wide?: boolean;
      required?: boolean;
    }[];
  }
> = {
  products: {
    title: "Sản phẩm",
    fields: [
      { key: "name", label: "Tên sản phẩm", required: true },
      { key: "slug", label: "Slug URL", required: true },
      { key: "category_id", label: "ID danh mục", type: "number" },
      { key: "sku", label: "Mã SKU" },
      { key: "brand", label: "Thương hiệu" },
      { key: "price", label: "Giá bán (VND)", type: "number", required: true },
      { key: "old_price", label: "Giá cũ (VND)", type: "number" },
      { key: "condition_label", label: "Tình trạng" },
      { key: "capacity", label: "Dung tích / công suất" },
      { key: "warranty", label: "Bảo hành" },
      { key: "stock", label: "Tồn kho", type: "number" },

      { key: "image_url", label: "Ảnh đại diện", wide: true },
      { key: "image_alt", label: "ALT ảnh đại diện", wide: true },

      { key: "short_description", label: "Mô tả ngắn", wide: true },
      {
        key: "description",
        label: "Nội dung chi tiết HTML",
        type: "editor",
        wide: true,
      },
      { key: "meta_title", label: "SEO title", wide: true },
      { key: "meta_description", label: "SEO description", wide: true },
      { key: "is_featured", label: "Sản phẩm nổi bật", type: "checkbox" },
      { key: "is_published", label: "Hiển thị trên website", type: "checkbox" },
    ],
  },

  categories: {
    title: "Danh mục",
    fields: [
      { key: "name", label: "Tên danh mục", required: true },
      { key: "slug", label: "Slug URL", required: true },
      {
        key: "parent_id",
        label: "ID danh mục cha (để trống nếu là danh mục gốc)",
        type: "number",
      },
      { key: "sort_order", label: "Thứ tự", type: "number" },
      { key: "description", label: "Mô tả", type: "textarea", wide: true },
    ],
  },

  posts: {
    title: "Bài viết",
    fields: [
      { key: "title", label: "Tiêu đề", required: true },
      { key: "slug", label: "Slug URL", required: true },
      { key: "excerpt", label: "Mô tả ngắn", type: "textarea", wide: true },

      { key: "image_url", label: "Ảnh đại diện", wide: true },
      { key: "image_alt", label: "ALT ảnh đại diện", wide: true },

      {
        key: "content",
        label: "Nội dung bài viết",
        type: "editor",
        wide: true,
        required: true,
      },
      {
        key: "status",
        label: "Trạng thái",
        type: "select",
        required: true,
      },
      { key: "meta_title", label: "SEO title", wide: true },
      { key: "meta_description", label: "SEO description", wide: true },
    ],
  },
};

const empty = (kind: string): Row =>
  Object.fromEntries(
    config[kind].fields.map((f) => [
      f.key,
      f.type === "checkbox"
        ? false
        : f.key === "condition_label"
          ? "Đã qua sử dụng"
          : f.key === "stock"
            ? 1
            : f.key === "status"
              ? "draft"
              : "",
    ])
  );

export default function CrudPanel({
  kind,
}: {
  kind: "products" | "categories" | "posts";
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>(() => empty(kind));
  const [editing, setEditing] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Quản lý cửa sổ thư viện ảnh
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<string | null>(null);

  // Lưu hàm chèn ảnh vào TinyMCE
  const editorInsertRef = useRef<((image: MediaImage) => void) | null>(null);

  const cfg = config[kind];

  async function load() {
    const r = await fetch(`/api/admin/${kind}`, {
      cache: "no-store",
    });

    const j = await r.json();

    if (!r.ok) {
      throw new Error(j.error || "Không tải được dữ liệu");
    }

    setRows(j.data);
  }

  useEffect(() => {
    setForm(empty(kind));
    setEditing(null);
    setError("");

    load().catch((e) => {
      setError(e.message);
    });
  }, [kind]);

  function change(key: string, value: any) {
    setForm((f: Row) => ({
      ...f,
      [key]: value,
    }));
  }

  // Mở thư viện ảnh để chọn ảnh đại diện
  function openMedia(target: string) {
    editorInsertRef.current = null;
    setMediaTarget(target);
    setMediaOpen(true);
  }

  // Nhận ảnh được chọn từ MediaLibrary
  function selectMedia(image: MediaImage) {
    if (mediaTarget === "__editor__") {
      editorInsertRef.current?.(image);
    } else if (mediaTarget === "image_url") {
      change("image_url", image.image_url);
      change("image_alt", image.alt_text);
    }

    setMediaOpen(false);
    setMediaTarget(null);
    editorInsertRef.current = null;
  }

  function closeMedia() {
    setMediaOpen(false);
    setMediaTarget(null);
    editorInsertRef.current = null;
  }

  function startEdit(row: Row) {
    const next = {
      ...empty(kind),
      ...row,
    };

    setForm(next);
    setEditing(Number(row.id));
    setNotice("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const url = editing
        ? `/api/admin/${kind}/${editing}`
        : `/api/admin/${kind}`;

      const r = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const j = await r.json();

      if (!r.ok) {
        throw new Error(j.error || "Không lưu được");
      }

      setNotice("Đã lưu thành công.");
      setForm(empty(kind));
      setEditing(null);

      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Bạn chắc chắn muốn xóa mục này?")) {
      return;
    }

    setError("");

    try {
      const r = await fetch(`/api/admin/${kind}/${id}`, {
        method: "DELETE",
      });

      const j = await r.json();

      if (!r.ok) {
        throw new Error(j.error || "Không xóa được");
      }

      setNotice("Đã xóa.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }

  return (
    <div className="space-y-6">
      {/* Tiêu đề chính */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight capitalize">
            Quản Lý {cfg.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tạo mới, chỉnh sửa và quản lý danh sách {cfg.title.toLowerCase()} của cửa hàng.
          </p>
        </div>
      </div>

      {/* Thông báo Notice / Error */}
      {notice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center justify-between shadow-xs">
          <span>✓ {notice}</span>
          <button type="button" onClick={() => setNotice("")} className="text-emerald-500 hover:text-emerald-800">✕</button>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl flex items-center justify-between shadow-xs">
          <span>⚠️ {error}</span>
          <button type="button" onClick={() => setError("")} className="text-red-400 hover:text-red-700">✕</button>
        </div>
      )}

      {/* FORM NHẬP / CHỈNH SỬA */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            {editing ? `Chỉnh sửa #${editing}` : `Thêm ${cfg.title.toLowerCase()} mới`}
          </h2>
          {editing && (
            <span className="text-xs bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-full">
              Đang sửa #{editing}
            </span>
          )}
        </div>

        <form onSubmit={save} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cfg.fields.map((f) => (
              <div
                key={f.key}
                className={`space-y-1.5 ${f.wide ? "md:col-span-2" : "col-span-1"}`}
              >
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {f.label} {f.required && <span className="text-red-600">*</span>}
                </label>

                {f.type === "editor" ? (
                  <div className="rounded-xl overflow-hidden border border-slate-300">
                    <TinyEditor
                      value={String(form[f.key] ?? "")}
                      onChange={(value) => change(f.key, value)}
                      onOpenMedia={(insertImage) => {
                        editorInsertRef.current = insertImage;
                        setMediaTarget("__editor__");
                        setMediaOpen(true);
                      }}
                    />
                  </div>
                ) : f.key === "image_url" ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={String(form.image_url ?? "")}
                        placeholder="URL ảnh đại diện hoặc chọn từ thư viện..."
                        onChange={(e) => change("image_url", e.target.value)}
                        className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => openMedia("image_url")}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all shrink-0 flex items-center gap-1.5"
                      >
                        🖼️ Thư viện ảnh
                      </button>
                    </div>

                    {form.image_url && (
                      <div className="relative w-36 h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
                        <img
                          src={String(form.image_url)}
                          alt={String(form.image_alt || "Ảnh đại diện")}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            change("image_url", "");
                            change("image_alt", "");
                          }}
                          className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                          title="Xóa ảnh"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                ) : f.type === "checkbox" ? (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id={`chk-${f.key}`}
                      checked={Boolean(form[f.key])}
                      onChange={(e) => change(f.key, e.target.checked)}
                      className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500 accent-red-600 cursor-pointer"
                    />
                    <label htmlFor={`chk-${f.key}`} className="text-xs text-slate-600 font-medium cursor-pointer">
                      Kích hoạt / Đánh dấu lựa chọn này
                    </label>
                  </div>
                ) : f.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={String(form[f.key] ?? "")}
                    onChange={(e) => change(f.key, e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                  />
                ) : f.type === "select" ? (
                  <select
                    required={f.required}
                    value={String(form[f.key] || "draft")}
                    onChange={(e) => change(f.key, e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="published">Xuất bản</option>
                  </select>
                ) : (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    required={f.required}
                    value={
                      form[f.key] === null
                        ? ""
                        : String(form[f.key] ?? "")
                    }
                    onChange={(e) => change(f.key, e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Nút hành động Form */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <button
              type="submit"
              disabled={busy}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {busy ? "Đang lưu..." : editing ? "Cập Nhật" : "Lưu Mới"}
            </button>

            <button
              type="button"
              onClick={() => {
                setForm(empty(kind));
                setEditing(null);
                setError("");
                setNotice("");
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all border border-slate-200"
            >
              Làm mới form
            </button>
          </div>
        </form>
      </section>

      {/* DANH SÁCH BẢNG DỮ LIỆU */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            Danh sách {cfg.title.toLowerCase()} ({rows.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 w-16">ID</th>
                <th className="py-3 px-4">Tên / Tiêu đề</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Trạng thái / Giá</th>
                <th className="py-3 px-4 text-right w-36">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                    Chưa có dữ liệu nào trong bảng này.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-400">#{row.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 max-w-xs truncate">
                      {row.name || row.title}
                    </td>
                    <td className="py-3 px-4 text-slate-500 max-w-xs truncate font-mono text-[11px]">
                      {row.slug}
                    </td>

                    <td className="py-3 px-4 font-semibold">
                      {kind === "products" ? (
                        <span className="text-red-600 font-bold">
                          {new Intl.NumberFormat("vi-VN").format(Number(row.price || 0))}₫
                          <span className="text-slate-400 font-normal text-[11px] ml-1">
                            ({row.is_published ? "Hiện" : "Ẩn"})
                          </span>
                        </span>
                      ) : kind === "posts" ? (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.status === "published"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {row.status === "published" ? "Xuất bản" : "Bản nháp"}
                        </span>
                      ) : (
                        <span className="text-slate-500">
                          {row.parent_id ? `ID cha: ${row.parent_id}` : "Danh mục gốc"}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => startEdit(row)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-colors border border-slate-200"
                        >
                          Sửa
                        </button>

                        <button
                          type="button"
                          onClick={() => remove(Number(row.id))}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[11px] rounded-lg transition-colors border border-red-200"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cửa sổ chọn ảnh dùng chung cho CRUD và TinyMCE */}
      {mediaOpen && (
        <MediaLibrary
          picker
          onSelect={selectMedia}
          onClose={closeMedia}
        />
      )}
    </div>
  );
}