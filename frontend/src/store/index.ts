import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";

export const defaultInitState: IAppState = {
  cities: [],
  countries: [],
  skills: [],
  users: {},
  allUsers: [],
  searchEnabled: false,
  searchUsers: [],
  isLoading: false,
  refetchFn: () => {},
};

export const createAppStore = (initState: IAppState = defaultInitState) => {
  return createStore<AppStore>()(
    devtools((set, get) => ({
      ...initState,
      toggleSearchEnabled: (enabled: boolean) => {
        return set({
          searchEnabled: enabled,
        });
      },
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

          const stateUsers = {
            ...state.users,
            ...usersMap,
          };

          return {
            ...state,
            users: stateUsers,
            ...(state.searchEnabled
              ? {
                  searchUsers: config?.replace
                    ? Object.keys(usersMap)
                    : [...state.searchUsers, ...Object.keys(usersMap)],
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
      setLoader: (loading) => set({ isLoading: loading }),
      setRefetchFn: (fn: () => void) => set({ refetchFn: fn }),
      setUser: (data) => {
        if (!data.userId) return;
        const state = get();
        set({
          users: {
            ...state.users,
            [data.userId]: {
              ...(state.users[data.userId] || {}),
              ...data,
            },
          },
        });
      },
    }))
  );
};
