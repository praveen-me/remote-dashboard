import { db } from "@/src/db";
import { schema } from "@/src/db/schema";
import { jsonExtract } from "@/src/utils/jsonExtract";
import { eq, sql } from "drizzle-orm";
import express, { Request, Response } from "express";

export const userRouter = express.Router();

userRouter.get(
  "/users",
  async (req: Request<{ offset?: number; limit?: number }>, res: Response) => {
    const { offset, limit } = req.params;

    try {
      // TODO: See why subquery needs the where clause it should also workout it.
      const skillsSubQuery = await db
        .select({
          userId: schema.MercorUserSkills.userId,
          skills: sql<
            string[] | null
          >`JSON_ARRAYAGG(${schema.Skills.skillName})`.as("skills"),
        })
        .from(schema.MercorUserSkills)
        .leftJoin(
          schema.Skills,
          eq(schema.MercorUserSkills.skillId, schema.Skills.skillId)
        )
        .groupBy(schema.MercorUserSkills.userId)
        .as("skills_subquery");

      const totalExperienceSubQuery = await db
        .select({
          resumeId: schema.WorkExperience.resumeId,
          totalExperience:
            sql<number>`IFNULL(MAX(${schema.WorkExperience.endDate}) -
            MIN(
              CASE WHEN ${schema.WorkExperience.startDate} = '' THEN
                NULL
              ELSE
                CAST(${schema.WorkExperience.startDate} AS DECIMAL)
              END
            ), 0)`.as("totalExperienceInYears"),
        })
        .from(schema.WorkExperience)
        .groupBy(schema.WorkExperience.resumeId)
        .as("total_experience_subquery");

      const users = await db
        .select({
          userId: schema.MercorUsers.userId,
          name: schema.MercorUsers.name,
          email: schema.MercorUsers.email,
          phone: schema.MercorUsers.phone,
          profilePic: schema.MercorUsers.profilePic,
          createdAt: schema.MercorUsers.createdAt,
          lastLogin: schema.MercorUsers.lastLogin,
          summary: schema.MercorUsers.summary,
          country: jsonExtract(
            schema.PersonalInformation.location,
            "$.country"
          ).as("country"),
          skills: skillsSubQuery.skills,
          fullTime: schema.MercorUsers.fullTime,
          partTime: schema.MercorUsers.partTime,
          totalExperience: totalExperienceSubQuery.totalExperience,
        })
        .from(schema.MercorUsers)
        .leftJoin(
          skillsSubQuery,
          eq(schema.MercorUsers.userId, skillsSubQuery.userId)
        )
        .leftJoin(
          schema.UserResume,
          eq(schema.MercorUsers.userId, schema.UserResume.userId)
        )
        .leftJoin(
          schema.PersonalInformation,
          eq(schema.UserResume.resumeId, schema.PersonalInformation.resumeId)
        )
        .leftJoin(
          totalExperienceSubQuery,
          eq(schema.UserResume.resumeId, totalExperienceSubQuery.resumeId)
        )
        .where(eq(schema.MercorUsers.userId, skillsSubQuery.userId))
        .limit(limit || 8)
        .offset(offset || 0);

      res.status(200).json({ users });
    } catch (e) {
      console.log(e);
    }
  }
);
