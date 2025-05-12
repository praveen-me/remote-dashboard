import { config } from "@elara/src/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: config.databaseUrl,
});

export const db = drizzle(pool);
