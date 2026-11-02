import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const rows = await query<any[]>(
      `SELECT 
        o.id, 
        o.customer_name, 
        o.phone, 
        o.message, 
        o.status, 
        o.created_at, 
        p.name AS product_name 
       FROM contact_orders o 
       LEFT JOIN products p ON p.id = o.product_id 
       ORDER BY o.created_at DESC 
       LIMIT 200`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("ORDERS_LIST_ERROR:", error);
    return NextResponse.json(
      { error: "Không thể tải danh sách yêu cầu." },
      { status: 500 }
    );
  }
}