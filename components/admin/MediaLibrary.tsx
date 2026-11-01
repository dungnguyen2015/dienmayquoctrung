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
    <div className="media-library">
      <div className="media-toolbar">
        <input
          type="search"
          placeholder="Tìm theo nội dung ALT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <section className="media-upload">
        <h3>Tải ảnh mới</h3>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <input
          type="text"
          maxLength={500}
          placeholder="ALT mô tả hình ảnh"
          value={uploadAlt}
          onChange={(e) => setUploadAlt(e.target.value)}
        />

        <button
          type="button"
          className="btn"
          disabled={busy || !file}
          onClick={upload}
        >
          {busy ? "Đang xử lý..." : "Tải ảnh lên"}
        </button>
      </section>

      {notice && <p className="notice">{notice}</p>}
      {error && <p className="error">{error}</p>}

      <div className="media-grid">
        {images.map((image) => (
          <article className="media-item" key={image.id}>
            <div className="media-preview">
              <img src={image.image_url} alt={image.alt_text} />
            </div>

            <div className="media-info">
              <small>
                {image.width || "?"} × {image.height || "?"}
                {" · "}
                {image.format?.toUpperCase() || "IMAGE"}
              </small>

              <input
                type="text"
                maxLength={500}
                aria-label={`ALT ảnh ${image.id}`}
                placeholder="Nhập ALT..."
                value={
                  editingAlt[image.id] ?? image.alt_text
                }
                onChange={(e) =>
                  setEditingAlt((old) => ({
                    ...old,
                    [image.id]: e.target.value,
                  }))
                }
              />

              <div className="media-actions">
                {picker && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() => onSelect?.(image)}
                  >
                    Chọn ảnh
                  </button>
                )}

                <button
                  type="button"
                  className="btn btnsecondary"
                  onClick={() => copyUrl(image.image_url)}
                >
                  Sao chép URL
                </button>

                <button
                  type="button"
                  className="btn btnsecondary"
                  disabled={busy}
                  onClick={() => saveAlt(image)}
                >
                  Lưu ALT
                </button>

                <button
                  type="button"
                  className="btn danger"
                  disabled={busy}
                  onClick={() => remove(image)}
                >
                  Xóa
                </button>
              </div>
            </div>
          </article>
        ))}

        {images.length === 0 && (
          <p>Chưa có ảnh trong thư viện.</p>
        )}
      </div>
    </div>
  );

  if (!picker) return content;

  return (
    <div className="media-modal-backdrop">
      <section
        className="media-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Chọn ảnh từ thư viện"
      >
        <header className="media-modal-header">
          <h2>Chọn ảnh từ thư viện</h2>

          <button
            type="button"
            className="btn btnsecondary"
            onClick={onClose}
          >
            Đóng
          </button>
        </header>

        {content}
      </section>
    </div>
  );
}