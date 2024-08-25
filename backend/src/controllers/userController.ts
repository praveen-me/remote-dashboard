import { db } from "@/src/db";
import { schema } from "@/src/db/schema";
import { SearchQuery } from "@/src/routes/user";
import { jsonExtract } from "@/src/utils/jsonExtract";
import { desc, eq, like, or, sql } from "drizzle-orm";

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

  const awardsSubQuery = await db
    .select({
      userId: schema.Awards.userId,
      awards: sql<
        string[] | null
      >`JSON_ARRAYAGG(${schema.Awards.awardName})`.as("awards"),
    })
    .from(schema.Awards)

    .groupBy(schema.Awards.userId)
    .as("awards_subquery");

  const totalExperienceSubQuery = await db
    .select({
      userId: schema.UserResume.userId,
      totalExperience: sql<number>`IFNULL(
        MAX(${schema.WorkExperience.endDate}) -
        MIN(
          CASE 
            WHEN ${schema.WorkExperience.startDate} = '' THEN 
              YEAR(CURDATE())
            ELSE 
              CAST(${schema.WorkExperience.startDate} AS DECIMAL)
          END
        ),
        0
      )`.as("totalExperienceInYears"),
    })
    .from(schema.WorkExperience)
    .innerJoin(
      schema.UserResume,
      eq(schema.WorkExperience.resumeId, schema.UserResume.resumeId)
    )
    .groupBy(schema.WorkExperience.resumeId)
    .as("total_experience_subquery");

  const personalInformationSubQuery = await db
    .select({
      userId: schema.UserResume.userId,
      location: schema.PersonalInformation.location,
    })
    .from(schema.PersonalInformation)
    .innerJoin(
      schema.UserResume,
      eq(schema.PersonalInformation.resumeId, schema.UserResume.resumeId)
    )
    .groupBy(schema.UserResume.userId, schema.PersonalInformation.location)
    .as("personal_information_subquery");
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
    }

    // TODO: Need to fix this logic to enable search on countries and cities
    // else if (searchType === "city" && !Array.isArray(searchQuery)) {
    //   queryBySearchType = sql`JSON_UNQUOTE(JSON_EXTRACT(${schema.PersonalInformation.location}, '$.city')) = ${searchQuery}`;
    // } else if (searchType === "country" && !Array.isArray(searchQuery)) {
    //   queryBySearchType = sql`JSON_UNQUOTE(JSON_EXTRACT(${schema.PersonalInformation.location}, '$.country')) = ${searchQuery}`;
    // }
  }

  const condition = userId
    ? eq(schema.MercorUsers.userId, userId)
    : queryBySearchType;

  // Conditional selection based on userId
  const userAvailability = {
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
          'isAvailable', IF(${schema.MercorUsers.fullTime} = 1, 1, 0),
          'currency', ${schema.MercorUsers.fullTimeSalaryCurrency}
        ),
        JSON_OBJECT(
          'type', 'partTime',
          'time', ${schema.MercorUsers.partTimeAvailability},
          'salary', ${schema.MercorUsers.partTimeSalary},
          'isAvailable', IF(${schema.MercorUsers.partTime} = 1, 1, 0),
          'currency', ${schema.MercorUsers.partTimeSalaryCurrency}
        )
      )
`.as("availability"),
  };

  let users = db
    .select({
      userId: schema.MercorUsers.userId,
      name: schema.MercorUsers.name,
      email: schema.MercorUsers.email,
      phone: schema.MercorUsers.phone,
      profilePic: schema.MercorUsers.profilePic,
      createdAt: schema.MercorUsers.createdAt,
      lastLogin: schema.MercorUsers.lastLogin,
      summary: schema.MercorUsers.summary,
      ...userAvailability,
      country: jsonExtract(
        personalInformationSubQuery.location,
        "$.country"
      ).as("country"),
      totalExperience: sql`IFNULL(${totalExperienceSubQuery.totalExperience}, 0)`,
      skills: sql`IFNULL(${skillsSubQuery.skills}, JSON_ARRAY())`,
      awards: sql`IFNULL(${awardsSubQuery.awards}, JSON_ARRAY())`,
    })
    .from(schema.MercorUsers)
    .leftJoin(
      totalExperienceSubQuery,
      eq(schema.MercorUsers.userId, totalExperienceSubQuery.userId)
    )
    .leftJoin(
      skillsSubQuery,
      eq(schema.MercorUsers.userId, skillsSubQuery.userId)
    )
    .leftJoin(
      personalInformationSubQuery,
      eq(schema.MercorUsers.userId, personalInformationSubQuery.userId)
    )
    .leftJoin(
      awardsSubQuery,
      eq(schema.MercorUsers.userId, awardsSubQuery.userId)
    );

  let total = [];

  if (!userId) {
    // TODO: Need to optimize this.
    total = await users;
  } else {
    total = [1];
  }

  if (condition) {
    users.where(condition);
  }

  users.offset(+(offset || 0)).limit(+(limit || 8));

  const data = await users;
  return { users: data, total: total.length };
};

const getUserDetailById = async (userId: string) => {
  const userBasicInfo = await getUsers({
    userId,
  });

  return {
    userBasicInfo: userBasicInfo.users[0],
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
  value: string | string[];
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
