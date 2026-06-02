import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function createDb(connectionString: string) {
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

export type Db = ReturnType<typeof createDb>;

let db: Db | null = null;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!db) {
    db = createDb(process.env.DATABASE_URL);
  }

  return db;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}
