"use client";
import ProfileCard from "@/components/ProfileCard";
import React from "react";

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

const App = () => {
  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center items-stretch">
        {users.map((user, index) => (
          <ProfileCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default App;
