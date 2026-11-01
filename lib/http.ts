import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) return { error: NextResponse.json({ error: "Bạn cần đăng nhập quản trị." }, { status: 401 }) };
  return { session };
}
export function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
