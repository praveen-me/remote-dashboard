import { db } from "@/src/db";
import { schema } from "@/src/db/schema";
import { SearchQuery } from "@/src/routes/user";
import { jsonExtract } from "@/src/utils/jsonExtract";
import { and, desc, eq, like, or, sql } from "drizzle-orm";

const getUsers = async ({
  limit,
  offset,
  userId,
  searchQuery,
  searchType,
}: {
  limit?: number;
  offset?: number;
  userId?: string;
  searchType?: SearchQuery["type"];
  searchQuery?: string | string[];
}) => {
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

  let queryBySearchType = null;

  if (searchQuery) {
    if (searchType === "name" && !Array.isArray(searchQuery)) {
      queryBySearchType = like(
        schema.MercorUsers.name,
        `%${searchQuery.toLowerCase()}%`
      );
    } else if (searchType === "skills") {
      queryBySearchType = Array.isArray(searchQuery)
        ? searchQuery
            .map(
              (skill) =>
                sql`JSON_CONTAINS(${skillsSubQuery.skills}, ${`"${skill}"`})`
            )
            .reduce(
              //@ts-ignore
              (acc, condition) => (acc ? or(acc, condition) : condition),
              null
            )
        : sql`JSON_CONTAINS(${skillsSubQuery.skills}, ${`"${searchQuery}"`})`;
    } else if (searchType === "city" && !Array.isArray(searchQuery)) {
      queryBySearchType = sql`JSON_UNQUOTE(JSON_EXTRACT(${schema.PersonalInformation.location}, '$.city')) = ${searchQuery}`;
    } else if (searchType === "country" && !Array.isArray(searchQuery)) {
      queryBySearchType = sql`JSON_UNQUOTE(JSON_EXTRACT(${schema.PersonalInformation.location}, '$.country')) = ${searchQuery}`;
    }
  }

  const condition = userId
    ? and(eq(schema.MercorUsers.userId, userId))
    : queryBySearchType
    ? and(
        eq(schema.MercorUsers.userId, skillsSubQuery.userId),
        queryBySearchType || sql``
      )
    : eq(schema.MercorUsers.userId, skillsSubQuery.userId);

  const baseFields = {
    fullTime: schema.MercorUsers.fullTime,
    partTime: schema.MercorUsers.partTime,
  };

  // Conditional selection based on userId
  const userAvailability = userId
    ? {
        availability: sql<
          {
            type: string;
            time: number | null;
            salary: string | null;
            isAvailable: boolean;
          }[]
        >`JSON_ARRAY(
            JSON_OBJECT(
              'type', 'fullTime',
              'time', ${schema.MercorUsers.fullTimeAvailability},
              'salary', ${schema.MercorUsers.fullTimeSalary},
              'isAvailable', ${schema.MercorUsers.fullTime},
              'currency', ${schema.MercorUsers.fullTimeSalaryCurrency}
            ),
            JSON_OBJECT(
              'type', 'partTime',
              'time', ${schema.MercorUsers.partTimeAvailability},
              'salary', ${schema.MercorUsers.partTimeSalary},
              'isAvailable', ${schema.MercorUsers.partTime},
              'currency', ${schema.MercorUsers.partTimeSalaryCurrency}
            )
          )`.as("availability"),
      }
    : baseFields;

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
      country: jsonExtract(schema.PersonalInformation.location, "$.country").as(
        "country"
      ),
      skills: skillsSubQuery.skills,
      totalExperience: totalExperienceSubQuery.totalExperience,
      ...userAvailability,
    })
    .from(schema.MercorUsers)
    .leftJoin(
      schema.UserResume,
      eq(schema.MercorUsers.userId, schema.UserResume.userId)
    )
    .leftJoin(
      schema.PersonalInformation,
      eq(schema.UserResume.resumeId, schema.PersonalInformation.resumeId)
    )
    .leftJoin(
      skillsSubQuery,
      eq(schema.MercorUsers.userId, skillsSubQuery.userId)
    )
    .leftJoin(
      totalExperienceSubQuery,
      eq(schema.UserResume.resumeId, totalExperienceSubQuery.resumeId)
    )
    .where(condition)
    .limit(limit || 8)
    .offset(offset || 0);

  return users;
};

const getUserDetailById = async (userId: string) => {
  const userBasicInfo = await getUsers({
    userId,
  });

  return {
    userBasicInfo: userBasicInfo[0],
  };
};

const getUserWorkExperienceById = async (userId: string) => {
  const userWorkExperience = await db
    .select({
      role: schema.WorkExperience.role,
      company: schema.WorkExperience.company,
      startDate: schema.WorkExperience.startDate,
      endDate: schema.WorkExperience.endDate,
      description: schema.WorkExperience.description,
      locationCity: schema.WorkExperience.locationCity,
      locationCountry: schema.WorkExperience.locationCountry,
    })
    .from(schema.WorkExperience)
    .leftJoin(
      schema.UserResume,
      eq(schema.WorkExperience.resumeId, schema.UserResume.resumeId)
    )
    .where(eq(schema.UserResume.userId, userId))
    .orderBy(desc(schema.WorkExperience.startDate));

  return userWorkExperience;
};

const getUserEducationById = async (userId: string) => {
  const userEducation = await db
    .select({
      school: schema.Education.school,
      degree: schema.Education.degree,
      startDate: schema.Education.startDate,
      endDate: schema.Education.endDate,
      major: schema.Education.major,
    })
    .from(schema.Education)
    .leftJoin(
      schema.UserResume,
      eq(schema.Education.resumeId, schema.UserResume.resumeId)
    )
    .where(eq(schema.UserResume.userId, userId))
    .orderBy(desc(schema.Education.startDate));

  return userEducation;
};

const searchUsers = async ({
  limit,
  offset,
  type,
  value,
}: {
  limit?: number;
  offset?: number;
  type: SearchQuery["type"];
  value: string;
}) => {
  const users = await getUsers({
    limit,
    offset,
    searchType: type,
    searchQuery: value,
  });

  return users;
};

export const userController = {
  getUsers,
  getUserDetailById,
  getUserWorkExperienceById,
  getUserEducationById,
  searchUsers,
};
