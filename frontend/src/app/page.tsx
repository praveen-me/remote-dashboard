"use client";
import { useEffect } from "react";
import { getAllUsers } from "@/api";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import { setup } from "@/utils/setup";
import { useAppStore } from "@/utils/StoreProvider";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/Loader";

const Page = () => {
  const { setInitialState, setUsers, allUsers, searchUsers, searchEnabled } =
    useAppStore((state) => state);
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getAllUsers(Number(8), allUsers.length);
      return response.data;
    },
  });

  useEffect(() => {
    if (!isLoading && data?.users) {
      setUsers(data.users);
    }
  }, [isLoading]);

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
            {usersToRender.map((user, index) => (
              <ProfileCard key={index} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
