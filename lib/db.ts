import mysql from "mysql2/promise";

const globalForMysql = globalThis as unknown as {
  mysqlPool?: mysql.Pool;
};

export const pool =
  globalForMysql.mysqlPool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 30000,

    charset: "utf8mb4",

    // Bật TLS khi DB_SSL=true
    ssl:
      process.env.DB_SSL === "true"
        ? {
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