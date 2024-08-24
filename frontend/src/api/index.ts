import axios, { AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getAllUsers = () => axiosInstance.get("/users");

export const getAllCities = (): Promise<
  AxiosResponse<GetAllCitiesAPIType, APIErrorResponse>
> => {
  return axiosInstance.get<GetAllCitiesAPIType>("/cities");
};

export const getAllCountries = (): Promise<
  AxiosResponse<GetAllCountriesAPIType, APIErrorResponse>
> => {
  return axiosInstance.get<GetAllCountriesAPIType>("/countries");
};

export const getAllSkills = (): Promise<
  AxiosResponse<GetAllSkillsAPIType, APIErrorResponse>
> => {
  return axiosInstance.get<GetAllSkillsAPIType>("/skills");
};
