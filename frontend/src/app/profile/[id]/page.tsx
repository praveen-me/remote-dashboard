"use client";
import { getUserExperience, getUserEducation, getUserBasicInfo } from "@/api";
import AvailabilityCard from "@/components/AvailablityCard";
import Button from "@/components/button";
import Education from "@/components/Education";
import WorkExperience from "@/components/Experience";
import { UserBasicInfo } from "@/components/UserBasicInfo";
import { useAppStore } from "@/utils/StoreProvider";
import { LuBookmark, LuMail } from "react-icons/lu";
import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import { Loader } from "@/components/Loader";

const Skeleton = ({ width, height }: { width: string; height: string }) => (
  <div
    className={`animate-pulse bg-gray-300 rounded ${width} h- ${height}`}
  ></div>
);

const Page = ({ params }: { params: { id: string } }) => {
  const { setUser } = useAppStore((state) => state);
  const currentUser = useAppStore((state) => state.getUser(params.id));

  const [
    { isLoading: isLoadingBasicInfo },
    { isLoading: isLoadingExperiences, data: userWorkExperiences },
    { isLoading: isLoadingEducations, data: userEducations },
  ] = useQueries({
    queries: [
      {
        queryKey: ["user", params.id],
        queryFn: async () => {
          const response = await getUserBasicInfo(params.id);

          console.log(response.data.user.userBasicInfo);
          setUser(response.data.user.userBasicInfo);
          return response.data;
        },
        enabled: !currentUser,
      },
      {
        queryKey: ["experiences", params.id],
        queryFn: () => getUserExperience(params.id).then((res) => res.data),
        enabled: !!currentUser,
      },
      {
        queryKey: ["educations", params.id],
        queryFn: () => getUserEducation(params.id).then((res) => res.data),
        enabled: !!currentUser,
      },
    ],
  });

  useEffect(() => {
    if (!isLoadingEducations && !isLoadingExperiences) {
      setUser({
        userId: params.id,
        //@ts-ignore
        experiences: userWorkExperiences?.workExperiences || [],
        //@ts-ignore
        educations: userEducations?.educations || [],
      });
    }
  }, [userWorkExperiences, userEducations]);

  const availability = currentUser?.availability;

  if (isLoadingBasicInfo) {
    return <Loader />;
  }

  return (
    <div className="max-w-[80%] m-auto bg-white border border-gray-200 my-8 rounded shadow-lg p-8">
      <div className="mb-4">
        <UserBasicInfo user={currentUser} />
      </div>
      <div className="flex gap-4 flex-row h-">
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
        {availability &&
          availability
            .filter((availability) => availability.isAvailable)
            .map((availability) => (
              <AvailabilityCard
                key={availability.type}
                title={
                  availability.type === "fullTime" ? "Full-time" : "Part-time"
                }
                hours={`Can start ${availability.time}+ hours / week immediately`}
                salary={`$${availability.salary}`}
              />
            ))}
      </div>
      <div className="my-4">
        {isLoadingExperiences ? (
          <Skeleton width="w-full" height="h-80" />
        ) : (
          Array.isArray(currentUser?.experiences) && (
            <WorkExperience experiences={currentUser?.experiences} />
          )
        )}
      </div>
      <div className="my-4">
        {isLoadingEducations ? (
          <Skeleton width="w-full" height="h-80" />
        ) : (
          Array.isArray(currentUser?.educations) && (
            <Education educations={currentUser?.educations} />
          )
        )}
      </div>
    </div>
  );
};

export default Page;
