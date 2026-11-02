import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Danh sách các trạng thái hợp lệ
const ALLOWED_STATUSES = ["pending", "contacted", "completed", "cancelled"];

// 1. PATCH: Cập nhật trạng thái yêu cầu tư vấn
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Trạng thái không hợp lệ." },
        { status: 400 }
      );
    }

    // Cập nhật trạng thái trong cơ sở dữ liệu
    const result: any = await query(
      `UPDATE contact_orders SET status = ? WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy yêu cầu tư vấn này." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công.",
      data: { id: Number(id), status },
    });
  } catch (error) {
    console.error("ORDER_UPDATE_ERROR:", error);
    return NextResponse.json(
      { error: "Không thể cập nhật trạng thái. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}

// 2. DELETE: Xóa yêu cầu tư vấn (nếu cần)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const { id } = await params;

    const result: any = await query(
      `DELETE FROM contact_orders WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy yêu cầu tư vấn để xóa." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Đã xóa yêu cầu tư vấn thành công.",
    });
  } catch (error) {
    console.error("ORDER_DELETE_ERROR:", error);
    return NextResponse.json(
      { error: "Không thể xóa yêu cầu. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}