"use client";
import { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/api";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import { setup } from "@/utils/setup";
import { useAppStore } from "@/utils/StoreProvider";
import { Loader } from "@/components/Loader";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const Page = () => {
  const { setInitialState, setUsers, allUsers, searchUsers, searchEnabled } =
    useAppStore((state) => state);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getAllUsers(Number(8), allUsers.length);
      return response.data;
    },
    enabled: true,
  });

  const loadMoreUsers = useCallback(() => {
    refetch();
  }, []);

  const loadMoreUsersRef = useIntersectionObserver(loadMoreUsers);

  useEffect(() => {
    if (!isLoading && data?.users) {
      setUsers(data.users);
    }
  }, [isLoading, data]);

  async function initializeState() {
    const [skillsData, citiesData, countriesData] = await setup();

    setInitialState({
      skills: skillsData.data.skills,
      cities: citiesData.data.cities,
      countries: countriesData.data.countries,
    });
  }

  useEffect(() => {
    if (!isLoading) {
      initializeState();
    }
  }, [setInitialState, isLoading]);

  const usersToRender = searchEnabled ? searchUsers : allUsers;

  return (
    <div className="w-full flex flex-col">
      <Header />

      {isLoading ? (
        <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center items-stretch">
            {usersToRender.map((user, index) =>
              index === allUsers.length - 1 ? (
                <ProfileCard ref={loadMoreUsersRef} key={index} user={user} />
              ) : (
                <ProfileCard key={index} user={user} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
