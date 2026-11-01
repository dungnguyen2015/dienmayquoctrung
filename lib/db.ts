import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "trungdienlanh",
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 100,
  enableKeepAlive: true,
  keepAliveInitialDelay: 30000,
});

export async function query<T = any>(sql: string, values?: any[]): Promise<T> {
  try {
    const [rows] = await db.execute(sql, values);
    return rows as T;
  } finally {
  }
}

// Query Cache Layer
const queryCache = new Map<string, { data: any; expire: number }>();

export async function cachedQuery(key: string, sql: string, values?: any[], ttlMs: number = 60000) {
  
  const now = Date.now();
  const cached = queryCache.get(key);
  if (cached && cached.expire > now) {
    return cached.data;
  }

  const result = await query(sql, values);
  queryCache.set(key, { data: result, expire: now + ttlMs });
  return result;
}