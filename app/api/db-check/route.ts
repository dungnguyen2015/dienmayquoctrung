
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT 1 AS connected, DATABASE() AS database_name"
    );

    return NextResponse.json({
      success: true,
      message: "Ket noi MySQL thanh cong",
      data: rows,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Khong ket noi duoc MySQL",
      },
      { status: 500 }
    );
  }
}
