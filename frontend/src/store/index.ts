import { createStore } from "zustand/vanilla";

export const defaultInitState: IAppState = {
  cities: [],
  countries: [],
  skills: [],
  users: {},
};

export const createAppStore = (initState: IAppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    setInitialState: (data) =>
      set((state) => {
        const cities = data.cities.map((city) => city.city);
        const countries = data.countries.map((country) => country.country);
        const skills = data.skills.map((skill) => skill.skill);

        return {
          ...state,
          cities,
          countries,
          skills,
        };
      }),
  }));
};
