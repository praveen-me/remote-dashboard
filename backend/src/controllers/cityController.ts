import { db } from "@/src/db";
import { schema } from "@/src/db/schema";
import { and, isNotNull, notInArray } from "drizzle-orm";

const getAllCities = async () => {
  const invalidCities = ["N/A", "Unknown", ""];

  const cities = await db
    .select({
      city: schema.WorkExperience.locationCity,
    })
    .from(schema.WorkExperience)
    .where(
      and(
        isNotNull(schema.WorkExperience.locationCity),
        notInArray(schema.WorkExperience.locationCity, invalidCities)
      )
    )
    .groupBy(schema.WorkExperience.locationCity);

  return cities;
};

export const cityController = {
  getAllCities: getAllCities,
};
