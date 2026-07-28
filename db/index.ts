import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export type Database = NodePgDatabase<typeof schema>;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsDrizzleDb?: Database;
  __arenaNextJsDbError?: string;
};

function initializeDb(): Database {
  if (globalForDb.__arenaNextJsDrizzleDb) {
    return globalForDb.__arenaNextJsDrizzleDb;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    const error = "Database not initialized — set DATABASE_URL before using Postgres-backed routes.";
    globalForDb.__arenaNextJsDbError = error;
    throw new Error(error);
  }

  const pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  const db = drizzle(pool, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
    globalForDb.__arenaNextJsDrizzleDb = db;
  }

  return db;
}

export function getDb(): Database {
  return initializeDb();
}

export function isDatabaseAvailable(): boolean {
  return !!process.env.DATABASE_URL;
}

export function getDbError(): string | undefined {
  return globalForDb.__arenaNextJsDbError;
}

let db: Database | undefined;

export function getDatabase(): Database {
  if (!db) {
    db = initializeDb();
  }
  return db;
}

// For direct exports
export const pool = globalForDb.__arenaNextJsPostgresqlPool;
