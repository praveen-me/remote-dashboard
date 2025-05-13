import { db } from "@elara/src/db/db";
import { sql } from "drizzle-orm";

export const retrieveMatchingDocuments = async (
  queryEmbedding: number[],
  matchCount = 5,
  filter: Record<string, any> = {}
) => {
  const results = await db.execute(
    sql`
      SELECT * FROM match_documents(
        ${sql.raw(`'[${queryEmbedding.join(",")}]'::vector`)},
        ${matchCount},
        ${JSON.stringify(filter)}::jsonb
      )
    `
  );

  return results;
};
