import { db } from "@/src/db";
import { schema } from "@/src/db/schema";
import { generateRandomSummary } from "@/src/utils/summaryGenerator";
import { eq, sql } from "drizzle-orm";

async function seedSummaries() {
  try {
    const usersWithoutSummary = await db
      .select({
        userId: schema.MercorUsers.userId,
      })
      .from(schema.MercorUsers)
      .where(sql`${schema.MercorUsers.summary} IS NULL`);

    // Update each user with a random summary
    for (const user of usersWithoutSummary) {
      const summary = generateRandomSummary();

      await db
        .update(schema.MercorUsers)
        .set({
          summary: summary,
        })
        .where(eq(schema.MercorUsers.userId, user.userId));
    }

    console.log("Summaries have been successfully seeded!");
  } catch (error) {
    console.error("Error seeding summaries:", error);
  }
}

seedSummaries();
