import { db } from "@/src/db";
import { schema } from "@/src/db/schema";

const getAllSkills = async () => {
  const skills = await db
    .select({
      skillId: schema.Skills.skillId,
      skillName: schema.Skills.skillName,
    })
    .from(schema.Skills);
  return skills;
};

export const skillsController = {
  getAllSkills,
};
