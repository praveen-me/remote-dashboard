import { db } from "@/src/db";
import { schema } from "@/src/db/schema";
import { generateRandomAward } from "@/src/utils/awardsGenerator";
import { generateRandomSummary } from "@/src/utils/summaryGenerator";
import { eq, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

async function seedSummaries() {
  try {
    const usersWithoutSummary = await db
      .select({
        userId: schema.MercorUsers.userId,
      })
      .from(schema.MercorUsers)
      .where(sql`${schema.MercorUsers.summary} is not null`);

    // Update each user with a random summary
    for (const user of usersWithoutSummary) {
      const summary = generateRandomSummary();

      await db
        .update(schema.MercorUsers)
        .set({
          summary: summary,
        })
        .where(eq(schema.MercorUsers.userId, user.userId));

      const totalAwards = Math.ceil(Math.random() * 5) + 1;

      for (let index = 0; index < totalAwards; index++) {
        const award = generateRandomAward();

        await db
          .insert(schema.Awards)
          .values({ awardName: award, userId: user.userId, awardId: uuidv4() });
      }
    }

    console.log("Summaries have been successfully seeded!");
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error("Error seeding summaries:", error);
    process.exit(1); // Exit with failure code
  }
}

seedSummaries();
