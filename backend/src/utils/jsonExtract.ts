import { SQL, sql } from "drizzle-orm";
import { MySqlColumn } from "drizzle-orm/mysql-core";

export function jsonExtract<T>(column: MySqlColumn, path: string): SQL<T> {
  return sql<T>`JSON_EXTRACT(${column}, ${path})`;
}
