import { getAllCities, getAllCountries, getAllSkills } from "@/api";

export const setup = async () => {
  return await Promise.all([getAllSkills(), getAllCities(), getAllCountries()]);
};
