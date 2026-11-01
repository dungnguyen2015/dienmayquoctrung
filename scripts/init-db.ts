
import { loadEnvConfig } from "@next/env";
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

// Nạp biến môi trường từ .env.local
loadEnvConfig(process.cwd());

async function main() {
  const sql = fs.readFileSync(
    path.join(process.cwd(), "schema.sql"),
    "utf8"
  );

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
  });

  try {
    await conn.query(sql);
    console.log("Đã khởi tạo database/schema và danh mục mẫu.");
  } finally {
    await conn.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
