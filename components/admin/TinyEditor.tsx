"use client";

import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import type { MediaImage } from "./MediaLibrary";

type TinyEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onOpenMedia?: (
    insertImage: (image: MediaImage) => void
  ) => void;
};

const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

export default function TinyEditor({
  value,
  onChange,
  onOpenMedia,
}: TinyEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  function openMedia() {
    if (!editorRef.current || !onOpenMedia) return;

    onOpenMedia((image) => {
      const editor = editorRef.current;
      if (!editor) return;

      editor.focus();

      editor.insertContent(
        `<img src="${image.image_url}" alt="${escapeHtml(
          image.alt_text
        )}" loading="lazy" />`
      );
    });
  }

  function escapeHtml(value: string) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  if (!apiKey || apiKey === "no-api-key") {
    return (
      <div style={{ color: "red", padding: 12 }}>
        Chưa cấu hình TinyMCE API Key trong .env.local
      </div>
    );
  }

  return (
    <div className="tiny-editor-wrap">
      <div style={{ marginBottom: 10 }}>
        <button
          type="button"
          className="btn btnsecondary"
          disabled={!onOpenMedia}
          onClick={openMedia}
        >
          Chọn ảnh từ thư viện
        </button>
      </div>

      <Editor
        apiKey={apiKey}
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        disabled={false}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "table",
            "code",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline | " +
            "alignleft aligncenter alignright | " +
            "bullist numlist | outdent indent | " +
            "link image table | code",
          content_style:
            "body { font-family: Arial; font-size: 16px; line-height: 1.7; }",
        }}
      />
    </div>
  );
}