import { createStore } from "zustand/vanilla";

export const defaultInitState: IAppState = {
  cities: [],
  countries: [],
  skills: [],
  users: {},
  allUsers: [],
};

export const createAppStore = (initState: IAppState = defaultInitState) => {
  return createStore<AppStore>()((set, get) => ({
    ...initState,
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
    setUsers: (users) =>
      set((state) => {
        const usersMap = users.reduce((acc, user) => {
          acc[user.userId] = user;
          return acc;
        }, {} as { [key: string]: User });

        const stateUsers = {
          ...state.users,
          ...usersMap,
        };

        return {
          ...state,
          users: stateUsers,
          allUsers: Object.keys(stateUsers),
        };
      }),
    getUser: (userId) => {
      const state = get();
      return state.users[userId];
    },
  }));
};
