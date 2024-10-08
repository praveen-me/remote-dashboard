import axios, { AxiosResponse } from "axios";

export interface SearchQuery {
  type: "skills" | "city" | "name" | "country";
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getAllUsers = (
  limit?: number,
  offset?: number
): Promise<AxiosResponse<GetAllUsersAPIType, APIErrorResponse>> =>
  axiosInstance.get<GetAllUsersAPIType>(
    `/users?limit=${limit}&offset=${offset}`
  );

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

export const searchUsers = ({
  limit,
  offset,
  searchQuery,
  searchType,
}: {
  limit?: number;
  offset?: number;
  searchType: SearchQuery["type"];
  searchQuery: string | string[];
}) =>
  axiosInstance.get<{ users: User[] }>(
    `/search?limit=${limit}&offset=${offset}&type=${searchType}&value=${searchQuery}`
  ) as Promise<AxiosResponse<{ users: User[] }, APIErrorResponse>>;

export const getUserExperience = (
  userId: string
): Promise<AxiosResponse<{ workExperiences: Experience }, APIErrorResponse>> =>
  axiosInstance.get<{ workExperiences: Experience }>(
    `/users/${userId}/experience`
  );

export const getUserEducation = (
  userId: string
): Promise<AxiosResponse<{ workExperiences: Experience }, APIErrorResponse>> =>
  axiosInstance.get<{ workExperiences: Experience }>(
    `/users/${userId}/education`
  );

export const getUserBasicInfo = (
  userId: string
): Promise<
  AxiosResponse<{ user: { userBasicInfo: Partial<User> } }, APIErrorResponse>
> =>
  axiosInstance.get<{ user: { userBasicInfo: Partial<User> } }>(
    `/users/${userId}/basic`
  );
