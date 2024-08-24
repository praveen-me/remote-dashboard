import { db } from "@/src/db";
import { schema } from "@/src/db/schema";
import { notEqual } from "assert";
import { and, isNotNull, notInArray } from "drizzle-orm";

const getAllCountries = async () => {
  const invalidCities = ["N/A", "Unknown", ""];

  const cities = await db
    .select({
      country: schema.WorkExperience.locationCountry,
    })
    .from(schema.WorkExperience)
    .where(
      and(
        isNotNull(schema.WorkExperience.locationCountry),
        notInArray(schema.WorkExperience.locationCountry, invalidCities)
      )
    )
    .groupBy(schema.WorkExperience.locationCountry);

  return cities;
};

export const countryController = {
  getAllCountries: getAllCountries,
};
