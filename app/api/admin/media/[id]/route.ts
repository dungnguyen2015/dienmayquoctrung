import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/http";
import cloudinary from "@/lib/cloudinary";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  req: NextRequest,
  { params }: Context
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const id = Number((await params).id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return NextResponse.json(
      { error: "ID ảnh không hợp lệ." },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const altText = body.alt_text;

    if (typeof altText !== "string" || altText.length > 500) {
      return NextResponse.json(
        { error: "ALT không hợp lệ hoặc vượt quá 500 ký tự." },
        { status: 400 }
      );
    }

    await query(
      "UPDATE media_images SET alt_text=? WHERE id=?",
      [altText.trim(), id]
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Không thể cập nhật ALT." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: Context
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const id = Number((await params).id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return NextResponse.json(
      { error: "ID ảnh không hợp lệ." },
      { status: 400 }
    );
  }

  try {
    const rows = await query<any[]>(
      "SELECT public_id FROM media_images WHERE id=? LIMIT 1",
      [id]
    );

    if (!rows.length) {
      return NextResponse.json(
        { error: "Không tìm thấy ảnh." },
        { status: 404 }
      );
    }

    const publicId = rows[0].public_id;

    const deleted = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (deleted.result !== "ok" && deleted.result !== "not found") {
      return NextResponse.json(
        { error: "Cloudinary chưa xác nhận xóa ảnh." },
        { status: 502 }
      );
    }

    await query("DELETE FROM media_images WHERE id=?", [id]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("MEDIA_DELETE_ERROR:", error);

    return NextResponse.json(
      { error: "Không thể xóa ảnh." },
      { status: 500 }
    );
  }
}