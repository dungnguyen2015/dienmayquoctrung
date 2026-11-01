import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import "dotenv/config";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
async function main(){
 const email=(process.env.ADMIN_EMAIL||"").toLowerCase().trim();
 const password=process.env.ADMIN_INITIAL_PASSWORD;
 if(!email||!password||password.length<12)throw new Error("Cần đặt ADMIN_EMAIL và ADMIN_INITIAL_PASSWORD (ít nhất 12 ký tự) trong môi trường chạy script.");
 const hash=await bcrypt.hash(password,12);
 const conn=await mysql.createConnection({host:process.env.DB_HOST,port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME});
 try{await conn.execute("INSERT INTO admins(email,password_hash) VALUES(?,?) ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)",[email,hash]);console.log(`Đã tạo/cập nhật tài khoản ${email}. Hãy xóa ADMIN_INITIAL_PASSWORD khỏi môi trường sau khi hoàn tất.`)}finally{await conn.end()}
}
main().catch(e=>{console.error(e);process.exit(1)});
