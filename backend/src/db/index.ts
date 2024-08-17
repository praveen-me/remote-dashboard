import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

import { schema } from "@/src/db/schema";

//@ts-ignore
export const connection = mysql.createPool(process.env.DB_URI);

export const db = drizzle(connection, {
  schema,
  mode: "default",
});
