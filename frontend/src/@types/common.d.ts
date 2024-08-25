// interface User {
//   profilePic: string;
//   name: string;
//   experience: string;
//   location: string;
//   description: string;
//   skills: string[];
//   availability: string[];
// }

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
