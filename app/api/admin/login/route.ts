
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
  createSession,
  sessionCookieName,
} from "@/lib/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email().max(190),
  password: z.string().min(8).max(200),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const p = schema.safeParse(body);

    if (!p.success) {
      return NextResponse.json(
        { error: "Thông tin đăng nhập không hợp lệ." },
        { status: 400 }
      );
    }

    const email = p.data.email.trim().toLowerCase();

    const rows = await query<
      {
        id: number;
        email: string;
        password_hash: string;
      }[]
    >(
      "SELECT id, email, password_hash FROM admins WHERE email = ? LIMIT 1",
      [email]
    );

    if (!rows[0]) {
      console.warn("LOGIN: Admin account not found");

      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng." },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(
      p.data.password,
      rows[0].password_hash
    );

    if (!validPassword) {
      console.warn("LOGIN: Password verification failed");

      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng." },
        { status: 401 }
      );
    }

    const token = await createSession(rows[0].email);

    const res = NextResponse.json({ ok: true });

    res.cookies.set(sessionCookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    return res;
  } catch (error) {
    console.error("LOGIN_API_ERROR:", error);

    return NextResponse.json(
      {
        error: "Không thể đăng nhập. Kiểm tra cấu hình máy chủ.",
      },
      { status: 500 }
    );
  }
}
