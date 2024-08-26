import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

import { schema } from "@/src/db/schema";

const DB = process.env.DB_URI;

//@ts-ignore
export const connection = mysql.createPool(DB);

export const db = drizzle(connection, {
  schema,
  mode: "default",
});
