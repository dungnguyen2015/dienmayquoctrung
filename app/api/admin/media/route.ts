import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/http";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_SIZE = 8 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

// Hàm chuẩn hóa tên file: bỏ dấu tiếng Việt, thay khoảng trắng/ký tự đặc biệt bằng dấu gạch ngang (-)
function slugifyFileName(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  const nameOnly = lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename;
  
  return nameOnly
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
    .replace(/[đĐ]/g, "d")           // Thay chữ đ/Đ
    .replace(/[^a-z0-9-_]/g, "-")    // Thay ký tự đặc biệt thành -
    .replace(/-+/g, "-");            // Gom nhiều dấu - liên tiếp
}

function uploadBuffer(buffer: Buffer, originalFilename?: string) {
  return new Promise<any>((resolve, reject) => {
    // Xử lý tên file nếu có
    const publicId = originalFilename ? slugifyFileName(originalFilename) : undefined;

    cloudinary.uploader.upload_stream(
      {
        folder: "dienmayquoctrung",
        resource_type: "image",
        overwrite: false,
        public_id: publicId,      // Đặt tên file trên Cloudinary trùng với tên gốc đã chuẩn hóa
        unique_filename: false,   // Bắt buộc để false để không bị nối thêm chuỗi ngẫu nhiên phía sau
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload thất bại."));
        resolve(result);
      }
    ).end(buffer);
  });
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const search = req.nextUrl.searchParams.get("search") || "";

    const data = await query<any[]>(
      `SELECT id, public_id, image_url, alt_text,
              width, height, format, bytes, created_at
       FROM media_images
       WHERE alt_text LIKE ?
       ORDER BY created_at DESC
       LIMIT 300`,
      [`%${search}%`]
    );

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: "Không thể tải thư viện ảnh." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const altText = String(formData.get("alt_text") || "").trim();

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Vui lòng chọn ảnh." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Chỉ chấp nhận JPG, PNG, WEBP hoặc AVIF." },
        { status: 400 }
      );
    }

    if (file.size <= 0 || file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ảnh phải có dung lượng tối đa 8 MB." },
        { status: 400 }
      );
    }

    if (altText.length > 500) {
      return NextResponse.json(
        { error: "ALT không được vượt quá 500 ký tự." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // TRUYỀN THÊM file.name VÀO ĐÂY ĐỂ GIỮ NGUYÊN TÊN ẢNH GỐC
    const uploaded = await uploadBuffer(buffer, file.name);

    try {
      const result: any = await query(
        `INSERT INTO media_images
         (public_id, image_url, alt_text, width, height, format, bytes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          uploaded.public_id,
          uploaded.secure_url,
          altText || file.name, // Nếu không nhập altText, có thể gán mặc định bằng tên file
          uploaded.width || null,
          uploaded.height || null,
          uploaded.format || null,
          uploaded.bytes || null,
        ]
      );

      return NextResponse.json(
        {
          id: result.insertId,
          public_id: uploaded.public_id,
          image_url: uploaded.secure_url,
          alt_text: altText || file.name,
          width: uploaded.width,
          height: uploaded.height,
          format: uploaded.format,
          bytes: uploaded.bytes,
        },
        { status: 201 }
      );
    } catch (dbError) {
      // Nếu MySQL lưu thất bại, xóa ảnh vừa tải lên để tránh ảnh mồ côi.
      await cloudinary.uploader.destroy(uploaded.public_id).catch(() => {});
      throw dbError;
    }
  } catch (error) {
    console.error("MEDIA_UPLOAD_ERROR:", error);

    return NextResponse.json(
      { error: "Không thể tải ảnh lên. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}