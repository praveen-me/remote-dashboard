"use client";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import { setup } from "@/utils/setup";
import { useAppStore } from "@/utils/StoreProvider";
import React, { useEffect } from "react";

const users = [
  {
    profilePic: "https://via.placeholder.com/150",
    name: "Yash Bajaj",
    experience: "8 years",
    location: "United States",
    description:
      "The candidate is a seasoned React Developer Consultant with a track record of leading teams, enhancing resource allocation by 80%, and significantly improving development efficiency and app accessibility.",
    skills: ["React", "React Native", "JavaScript", "HTML/CSS", "Redux"],
    availability: ["Full-time", "Part-time"],
  },
  {
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Doe",
    experience: "5 years",
    location: "Canada",
    description:
      "Jane is an experienced Full Stack Developer with a focus on scalable solutions and performance optimization.",
    skills: ["Node.js", "Express", "MongoDB", "React"],
    availability: ["Full-time"],
  },
  {
    profilePic: "https://via.placeholder.com/150",
    name: "Yash Bajaj",
    experience: "8 years",
    location: "United States",
    description:
      "The candidate is a seasoned React Developer Consultant with a track record of leading teams, enhancing resource allocation by 80%, and significantly improving development efficiency and app accessibility.",
    skills: [
      "React",
      "React Native",
      "JavaScript",
      "HTML/CSS",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "React",
    ],
    availability: ["Full-time", "Part-time"],
  },
  {
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Doe",
    experience: "5 years",
    location: "Canada",
    description:
      "Jane is an experienced Full Stack Developer with a focus on scalable solutions and performance optimization.",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "React",
    ],
    availability: ["Full-time"],
  },
];

const Page = () => {
  const { setInitialState } = useAppStore((state) => state);

  useEffect(() => {
    async function initializeState() {
      const [skillsData, citiesData, countriesData] = await setup();

      setInitialState({
        skills: skillsData.data.skills,
        cities: citiesData.data.cities,
        countries: countriesData.data.countries,
      });
    }

    initializeState();
  }, [setInitialState]);

  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center items-stretch">
          {users.map((user, index) => (
            <ProfileCard key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
