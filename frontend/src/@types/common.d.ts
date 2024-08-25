interface User {
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
  experiences?: Experience[];
  educations?: Education[];
  availability: UserAvailability[];
  awards: string[];
}

interface UserAvailability {
  time: null;
  type: "partTime" | "fullTime";
  salary: number;
  currency: string;
  isAvailable: number;
}

interface IAppState {
  cities: string[];
  countries: string[];
  skills: string[];
  users: {
    [key: string]: User;
  };
  allUsers: string[];
  searchEnabled: boolean;
  searchUsers: string[];
  isLoading: boolean;
  refetchFn: () => void;
}

type IAppStateActions = {
  setInitialState: (data: {
    cities: GetAllCitiesAPIType["cities"];
    countries: GetAllCountriesAPIType["countries"];
    skills: GetAllSkillsAPIType["skills"];
  }) => void;
  setUsers: (
    users: Users[],
    config?: {
      replace: boolean;
    }
  ) => void;
  getUser: (userId: string) => User;
  toggleSearchEnabled: (enabled: boolean) => void;
  setLoader: (loading: boolean) => void;
  setRefetchFn: (fn: () => void) => void;
  setUser: (data: Partial<User>) => void;
};

type AppStore = IAppState & IAppStateActions;

type GetAllCitiesAPIType = {
  cities: { city: string }[];
};

type GetAllCountriesAPIType = {
  countries: { country: string }[];
};

type GetAllSkillsAPIType = {
  skills: { skillName: string }[];
};

type GetAllUsersAPIType = {
  users: User[];
  total: number;
};

interface APIErrorResponse {
  message: string;
}

interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  locationCity: string;
  locationCountry: string;
}

interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  major: string;
}
