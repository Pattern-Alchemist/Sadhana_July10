import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export type Database = NodePgDatabase<typeof schema>;

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsDrizzleDb?: Database;
};

let pool: Pool | null = null;
let db: Database | null = null;

if (databaseUrl) {
  pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  db = globalForDb.__arenaNextJsDrizzleDb ?? drizzle(pool, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
    globalForDb.__arenaNextJsDrizzleDb = db;
  }
}

export function getDb(): Database {
  if (!db) {
    throw new Error("Database not initialized — set DATABASE_URL before using Postgres-backed routes.");
  }

  return db;
}

export { pool, db };
