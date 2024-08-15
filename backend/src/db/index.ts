import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";

const client = new Client({
  host: process.env.LOCAL_DB,
  username: process.env.LOCAL_USER,
  password: process.env.LOCAL_PASSWORD,
});

export const db = drizzle(client);
