interface User {
  profilePic: string;
  name: string;
  experience: string;
  location: string;
  description: string;
  skills: string[];
  availability: string[];
}

interface UserAPIResponse {
  userId: string;
  name: string;
  email: string;
  phone: string;
  profilePic: string | null;
  createdAt: string;
  lastLogin: string;
  summary: string | null;
  country: string;
  skills: string[];
  totalExperience: number;
  fullTime: boolean;
  partTime: boolean;
}

interface IAppState {
  cities: string[];
  countries: string[];
  skills: string[];
  users: {
    [key: string]: User;
  };
}

type IAppStateActions = {
  setInitialState: (data: {
    cities: GetAllCitiesAPIType["cities"];
    countries: GetAllCountriesAPIType["countries"];
    skills: GetAllSkillsAPIType["skills"];
  }) => void;
};

type AppStore = IAppState & IAppStateActions;

type GetAllCitiesAPIType = {
  cities: { city: string }[];
};

type GetAllCountriesAPIType = {
  countries: { country: string }[];
};

type GetAllSkillsAPIType = {
  skills: { skill: string }[];
};

interface APIErrorResponse {
  message: string;
}
