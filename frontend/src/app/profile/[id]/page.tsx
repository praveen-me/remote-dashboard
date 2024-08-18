import { LuBookmark, LuMail } from "react-icons/lu";

import AvailabilityCard from "@/components/AvailablityCard";
import Button from "@/components/button";
import Education from "@/components/Education";
import WorkExperience from "@/components/Experience";
import { UserBasicInfo } from "@/components/UserBasicInfo";

const user = {
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
};

export default function Page({ params }: { params: { id: string } }) {
  console.log({ id: params.id });

  return (
    <div className="max-w-[80%] m-auto bg-white border border-gray-200  my-8 rounded shadow-lg p-8">
      <div className="mb-4">
        <UserBasicInfo user={user} />
      </div>
      <div className="flex gap-4 flex-row">
        <Button
          text="Request Introduction"
          variant="primary"
          startIcon={<LuMail size={24} />}
        />
        <Button
          text="Shortlist"
          variant="secondary"
          startIcon={<LuBookmark size={24} />}
        />

        <Button
          text="Shortlist"
          rightIcon={<LuBookmark size={24} className="text-black" />}
          raw
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 p-4">
        <AvailabilityCard
          title="Full-time"
          hours="Can start 40+ hours / week immediately"
          salary="$781"
        />
        <AvailabilityCard
          title="Part-time"
          hours="Can start 20+ hours / week immediately"
          salary="$434"
        />
      </div>
      <WorkExperience />
      <Education />
    </div>
  );
}
