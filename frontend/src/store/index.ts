import { createStore } from "zustand/vanilla";

export const defaultInitState: IAppState = {
  cities: [],
  countries: [],
  skills: [],
  users: {},
  allUsers: [],
  searchEnabled: false,
  searchUsers: [],
};

export const createAppStore = (initState: IAppState = defaultInitState) => {
  return createStore<AppStore>()((set, get) => ({
    ...initState,
    toggleSearchEnabled: (enabled: boolean) =>
      set({
        searchEnabled: enabled,
      }),
    setInitialState: (data) =>
      set((state) => {
        const cities = data.cities.map((city) => city.city);
        const countries = data.countries.map((country) => country.country);
        const skills = data.skills.map((skill) => skill.skillName);

        return {
          ...state,
          cities,
          countries,
          skills,
        };
      }),
    setUsers: (users, config) =>
      set((state) => {
        const usersMap = users.reduce((acc, user) => {
          acc[user.userId] = user;
          return acc;
        }, {} as { [key: string]: User });

        const searchUsers = config?.searchUsers || false;

        const stateUsers = {
          ...state.users,
          ...usersMap,
        };

        return {
          ...state,
          users: stateUsers,
          ...(searchUsers
            ? {
                searchUsers: state.searchEnabled
                  ? [...state.searchUsers, ...Object.keys(usersMap)]
                  : [],
              }
            : {
                allUsers: [...state.allUsers, ...Object.keys(usersMap)],
              }),
        };
      }),
    getUser: (userId) => {
      const state = get();
      return state.users[userId];
    },
  }));
};
