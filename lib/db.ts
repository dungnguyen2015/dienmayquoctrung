
import mysql from "mysql2/promise";

const globalForMysql = globalThis as unknown as {
  mysqlPool?: mysql.Pool;
};

const sslEnabled = process.env.DB_SSL === "true";
const sslCA = process.env.DB_SSL_CA;

if (sslEnabled && !sslCA) {
  throw new Error("DB_SSL_CA is required when DB_SSL=true");
}

export const pool =
  globalForMysql.mysqlPool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 30000,

    charset: "utf8mb4",

    ssl: sslEnabled
      ? {
          ca: sslCA,
          rejectUnauthorized: true,
        }
      : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMysql.mysqlPool = pool;
}

export async function query<T = any>(
  sql: string,
  values: any[] = []
): Promise<T> {
  const [rows] = await pool.execute(sql, values);
  return rows as T;
}
