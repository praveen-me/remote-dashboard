"use client";
import { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/api";
import { setup } from "@/utils/setup";
import { useAppStore } from "@/utils/StoreProvider";
import { Loader } from "@/components/Loader";

import SearchDropdown from "@/components/SearchDropdown";
import { RenderCards } from "@/components/RenderCards";

const Page = () => {
  const {
    setInitialState,
    setUsers,
    allUsers,
    searchUsers,
    searchEnabled,
    isLoading: loader,
    setLoader,
    refetchFn,
  } = useAppStore((state) => state);
  const { isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getAllUsers(Number(8), allUsers.length);
      setUsers(response.data.users);
      return response.data;
    },
  });

  const loadMoreUsers = useCallback(() => {
    refetch();
  }, []);

  async function initializeState() {
    const [skillsData, citiesData, countriesData] = await setup();

    setInitialState({
      skills: skillsData.data.skills,
      cities: citiesData.data.cities,
      countries: countriesData.data.countries,
    });
  }

  useEffect(() => {
    setLoader(isLoading);
    if (!isLoading) {
      initializeState();
    }
  }, [isLoading]);

  const usersToRender = useMemo(
    () => (searchEnabled ? searchUsers : allUsers),
    [searchEnabled, searchUsers, allUsers]
  );

  const intersectionObserverCb = searchEnabled ? refetchFn : loadMoreUsers;

  return (
    <div className="w-full flex flex-col">
      <header className="bg-blue-600 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Mercor Task</div>
        <div className="flex-grow mx-8">
          <SearchDropdown />
        </div>
        <div className="text-white text-xl font-bold">Settings</div>
      </header>

      {loader ? (
        <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center items-stretch">
            <RenderCards
              userIds={usersToRender}
              intersectionObserverCb={intersectionObserverCb}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
