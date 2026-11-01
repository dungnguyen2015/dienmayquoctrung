
"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import MediaLibrary, {
  type MediaImage,
} from "./MediaLibrary";

const TinyEditor = dynamic(
  () => import("./TinyEditor"),
  {
    ssr: false,
    loading: () => <div>Đang tải trình soạn thảo...</div>,
  }
);

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
  const editorInsertRef = useRef<
    ((image: MediaImage) => void) | null
  >(null);

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
      setError(
        e instanceof Error ? e.message : "Có lỗi xảy ra"
      );
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
      setError(
        e instanceof Error ? e.message : "Có lỗi xảy ra"
      );
    }
  }

  return (
    <>
      <h1>Quản lý {cfg.title.toLowerCase()}</h1>

      {notice && <div className="notice">{notice}</div>}
      {error && <div className="error">{error}</div>}

      <section className="admincard">
        <h2>
          {editing
            ? `Sửa #${editing}`
            : `Thêm ${cfg.title.toLowerCase()}`}
        </h2>

        <form className="adminform" onSubmit={save}>
          {cfg.fields.map((f) => (
            <label
              key={f.key}
              className={f.wide ? "wide" : ""}
            >
              {f.label}

              {f.type === "editor" ? (
                <TinyEditor
                  value={String(form[f.key] ?? "")}
                  onChange={(value) => change(f.key, value)}
                  onOpenMedia={(insertImage) => {
                    editorInsertRef.current = insertImage;
                    setMediaTarget("__editor__");
                    setMediaOpen(true);
                  }}
                />
              ) : f.key === "image_url" ? (
                <div className="media-field">
                  <input
                    type="text"
                    value={String(form.image_url ?? "")}
                    placeholder="URL ảnh đại diện"
                    onChange={(e) =>
                      change("image_url", e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="btn btnsecondary"
                    onClick={() => openMedia("image_url")}
                  >
                    Chọn ảnh từ thư viện
                  </button>

                  {form.image_url && (
                    <img
                      src={String(form.image_url)}
                      alt={String(form.image_alt || "")}
                      className="media-field-preview"
                    />
                  )}
                </div>
              ) : f.type === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={Boolean(form[f.key])}
                  onChange={(e) =>
                    change(f.key, e.target.checked)
                  }
                />
              ) : f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={String(form[f.key] ?? "")}
                  onChange={(e) =>
                    change(f.key, e.target.value)
                  }
                />
              ) : f.type === "select" ? (
                <select
                  required={f.required}
                  value={String(form[f.key] || "draft")}
                  onChange={(e) =>
                    change(f.key, e.target.value)
                  }
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
                  onChange={(e) =>
                    change(f.key, e.target.value)
                  }
                />
              )}
            </label>
          ))}

          <div className="wide actions">
            <button className="btn" disabled={busy}>
              {busy ? "Đang lưu..." : "Lưu"}
            </button>

            <button
              type="button"
              className="btn btnsecondary"
              onClick={() => {
                setForm(empty(kind));
                setEditing(null);
                setError("");
                setNotice("");
              }}
            >
              Làm mới
            </button>
          </div>
        </form>
      </section>

      <section className="admincard">
        <h2>Danh sách ({rows.length})</h2>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên / tiêu đề</th>
                <th>Slug</th>
                <th>Trạng thái / giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name || row.title}</td>
                  <td>{row.slug}</td>

                  <td>
                    {kind === "products"
                      ? new Intl.NumberFormat("vi-VN").format(
                          Number(row.price || 0)
                        ) +
                        "₫ · " +
                        (row.is_published ? "Hiện" : "Ẩn")
                      : kind === "posts"
                        ? row.status
                        : row.parent_id || "Danh mục gốc"}
                  </td>

                  <td>
                    <div className="actions">
                      <button
                        type="button"
                        className="btn btnsecondary"
                        onClick={() => startEdit(row)}
                      >
                        Sửa
                      </button>

                      <button
                        type="button"
                        className="btn danger"
                        onClick={() => remove(Number(row.id))}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
    </>
  );
}
