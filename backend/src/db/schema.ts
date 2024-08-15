import {
  mysqlTable,
  varchar,
  primaryKey,
  boolean,
  int,
  json,
  text,
  datetime,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

import { relations } from "drizzle-orm/relations";
import { v4 as uuidv4 } from "uuid";

export const MercorUsers = mysqlTable("MercorUsers", {
  userId: varchar("userId", { length: 255 }).primaryKey().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  residence: json("residence"),
  profilePic: text("profilePic"),
  createdAt: datetime("createdAt", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  lastLogin: datetime("lastLogin", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  notes: text("notes"),
  referralCode: varchar("referralCode", { length: 255 }).default(uuidv4()),
  isGptEnabled: boolean("isGptEnabled").notNull(),
  preferredRole: varchar("preferredRole", { length: 255 }),
  fullTimeStatus: varchar("fullTimeStatus", { length: 255 }),
  workAvailability: varchar("workAvailability", { length: 255 }),
  fullTimeSalaryCurrency: varchar("fullTimeSalaryCurrency", { length: 255 }),
  fullTimeSalary: varchar("fullTimeSalary", { length: 255 }),
  partTimeSalaryCurrency: varchar("partTimeSalaryCurrency", { length: 255 }),
  partTimeSalary: varchar("partTimeSalary", { length: 255 }),
  fullTime: boolean("fullTime").notNull(),
  fullTimeAvailability: int("fullTimeAvailability"),
  partTime: boolean("partTime").notNull(),
  partTimeAvailability: int("partTimeAvailability"),
  w8BenUrl: json("w8BenUrl"),
  tosUrl: text("tosUrl"),
  policyUrls: json("policyUrls"),
  isPreVetted: boolean("isPreVetted").notNull(),
  isActive: boolean("isActive").notNull(),
  isComplete: boolean("isComplete").notNull(),
  summary: text("summary"),
  preVettedAt: datetime("preVettedAt", { mode: "string" }),
});

export const Education = mysqlTable("Education", {
  educationId: varchar("educationId", { length: 255 }).primaryKey().notNull(),
  degree: varchar("degree", { length: 255 }),
  major: varchar("major", { length: 255 }),
  school: varchar("school", { length: 255 }),
  startDate: varchar("startDate", { length: 255 }),
  endDate: varchar("endDate", { length: 255 }),
  grade: varchar("grade", { length: 255 }),
  resumeId: varchar("resumeId", { length: 255 }).references(
    () => UserResume.resumeId,
    { onDelete: "cascade" }
  ),
});

export const MercorUserSkills = mysqlTable(
  "MercorUserSkills",
  {
    userId: varchar("userId", { length: 255 })
      .primaryKey()
      .notNull()
      .references(() => MercorUsers.userId, { onDelete: "cascade" }),
    skillId: varchar("skillId", { length: 255 })
      .primaryKey()
      .notNull()
      .references(() => Skills.skillId, { onDelete: "cascade" }),
    isPrimary: boolean("isPrimary").notNull(),
    order: int("order").default(0).notNull(),
  },
  (table) => {
    return {
      primary: primaryKey({
        columns: [table.userId, table.skillId],
        name: "PRIMARY",
      }),
    };
  }
);

export const PersonalInformation = mysqlTable("PersonalInformation", {
  personalInformationId: varchar("personalInformationId", { length: 255 })
    .primaryKey()
    .notNull(),
  name: varchar("name", { length: 255 }),
  location: json("location"),
  email: json("email"),
  phone: json("phone"),
  resumeId: varchar("resumeId", { length: 255 }).references(
    () => UserResume.resumeId,
    { onDelete: "cascade" }
  ),
});

export const Skills = mysqlTable("Skills", {
  skillId: varchar("skillId", { length: 255 }).primaryKey().notNull(),
  skillName: varchar("skillName", { length: 255 }).notNull(),
  skillValue: varchar("skillValue", { length: 255 }).notNull(),
});

export const UserResume = mysqlTable("UserResume", {
  resumeId: varchar("resumeId", { length: 255 }).primaryKey().notNull(),
  url: text("url"),
  filename: varchar("filename", { length: 255 }).notNull(),
  createdAt: datetime("createdAt", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: datetime("updatedAt", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  source: varchar("source", { length: 255 }).default("platform").notNull(),
  ocrText: text("ocrText"),
  ocrEmail: varchar("ocrEmail", { length: 255 }),
  ocrGithubUsername: varchar("ocrGithubUsername", { length: 255 }),
  resumeBasedQuestions: text("resumeBasedQuestions"),
  userId: varchar("userId", { length: 255 }).references(
    () => MercorUsers.userId,
    { onDelete: "cascade" }
  ),
  isInvitedToInterview: boolean("isInvitedToInterview").notNull(),
  reminderTasksIds: json("reminderTasksIds"),
});

export const workExperience = mysqlTable("WorkExperience", {
  workExperienceId: varchar("workExperienceId", { length: 255 })
    .primaryKey()
    .notNull(),
  company: varchar("company", { length: 255 }),
  role: varchar("role", { length: 255 }),
  startDate: varchar("startDate", { length: 255 }),
  endDate: varchar("endDate", { length: 255 }),
  description: text("description"),
  locationCity: varchar("locationCity", { length: 255 }),
  locationCountry: varchar("locationCountry", { length: 255 }),
  resumeId: varchar("resumeId", { length: 255 }).references(
    () => UserResume.resumeId,
    { onDelete: "cascade" }
  ),
});
export const educationRelations = relations(Education, ({ one }) => ({
  userResume: one(UserResume, {
    fields: [Education.resumeId],
    references: [UserResume.resumeId],
  }),
}));

export const userResumeRelations = relations(UserResume, ({ one, many }) => ({
  educations: many(Education),
  personalInformations: many(PersonalInformation),
  mercorUser: one(MercorUsers, {
    fields: [UserResume.userId],
    references: [MercorUsers.userId],
  }),
  workExperiences: many(workExperience),
}));

export const mercorUserSkillsRelations = relations(
  MercorUserSkills,
  ({ one }) => ({
    skill: one(Skills, {
      fields: [MercorUserSkills.skillId],
      references: [Skills.skillId],
    }),
    mercorUser: one(MercorUsers, {
      fields: [MercorUserSkills.userId],
      references: [MercorUsers.userId],
    }),
  })
);

export const skillsRelations = relations(Skills, ({ many }) => ({
  mercorUserSkills: many(MercorUserSkills),
}));

export const mercorUsersRelations = relations(MercorUsers, ({ many }) => ({
  mercorUserSkills: many(MercorUserSkills),
  userResumes: many(UserResume),
}));

export const personalInformationRelations = relations(
  PersonalInformation,
  ({ one }) => ({
    userResume: one(UserResume, {
      fields: [PersonalInformation.resumeId],
      references: [UserResume.resumeId],
    }),
  })
);

export const workExperienceRelations = relations(workExperience, ({ one }) => ({
  userResume: one(UserResume, {
    fields: [workExperience.resumeId],
    references: [UserResume.resumeId],
  }),
}));

export const schema = {
  Education,
  MercorUserSkills,
  MercorUsers,
  PersonalInformation,
  Skills,
  UserResume,
  workExperience,
  educationRelations,
  userResumeRelations,
  mercorUserSkillsRelations,
  skillsRelations,
  mercorUsersRelations,
  personalInformationRelations,
  workExperienceRelations,
};
