"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/api";
import { setup } from "@/utils/setup";
import { useAppStore } from "@/utils/StoreProvider";

import SearchDropdown from "@/components/SearchDropdown";
import { RenderCards } from "@/components/RenderCards";
import ProfileCardShimmer from "@/components/Shimmers/ProfileCardShimmer";

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
  const { isLoading, refetch, data, isRefetching } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getAllUsers(Number(8), allUsers.length);
      return response.data;
    },
  });

  const initialRender = useRef(true);

  useEffect(() => {
    if (data) {
      setUsers(data?.users);
    }
  }, [data]);

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
    setLoader(isLoading || isRefetching);
  }, [isLoading, isRefetching]);

  useEffect(() => {
    if (!isLoading) {
      initialRender.current = false;
      initializeState();
    }
  }, [isLoading]);

  const usersToRender = useMemo(
    () => (searchEnabled ? searchUsers : allUsers),
    [searchEnabled, searchUsers, allUsers]
  );

  const intersectionObserverCb = searchEnabled ? refetchFn : loadMoreUsers;

  return (
    <div className="w-full flex flex-col min-h-full">
      <header className="bg-blue-600 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Mercor Task</div>
        <div className="flex-grow mx-8">
          <SearchDropdown />
        </div>
        <div className="text-white text-xl font-bold">Settings</div>
      </header>

      <div className="flex-grow flex items-center justify-center h-full">
        {
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-7xl px-4 my-8 h-full">
            {!usersToRender.length && (loader || initialRender.current) ? (
              Array(4)
                .fill(0)
                .map((_, index) => <ProfileCardShimmer key={index} />)
            ) : (
              <>
                <RenderCards
                  userIds={usersToRender}
                  intersectionObserverCb={intersectionObserverCb}
                />
                {loader &&
                  Array(2)
                    .fill(0)
                    .map((_, index) => <ProfileCardShimmer key={index} />)}
              </>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Page;
