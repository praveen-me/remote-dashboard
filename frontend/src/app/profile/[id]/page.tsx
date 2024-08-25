"use client";
import { getUserExperience, getUserEducation, getUserBasicInfo } from "@/api";
import AvailabilityCard from "@/components/AvailablityCard";
import Button from "@/components/button";
import { UserBasicInfo } from "@/components/UserBasicInfo";
import { useAppStore } from "@/utils/StoreProvider";
import {
  LuArrowRight,
  LuBookmark,
  LuCamera,
  LuMail,
  LuUpload,
} from "react-icons/lu";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { Loader } from "@/components/Loader";
import Badge from "@/components/Badge";
import {
  BsBriefcase,
  BsCameraVideo,
  BsFolder,
  BsMortarboard,
  BsTrophy,
} from "react-icons/bs";
import Awards from "@/components/Awards";
import Education from "@/components/Education";
import WorkExperience from "@/components/Experience";

const Skeleton = ({ width, height }: { width: string; height: string }) => (
  <div
    className={`animate-pulse bg-gray-300 rounded ${width} h- ${height}`}
  ></div>
);
const buttons = [
  { text: "Interview", icon: <BsCameraVideo size={24} /> },
  { text: "Experience", icon: <BsBriefcase size={24} /> },
  { text: "Education", icon: <BsMortarboard size={24} /> },
  { text: "Awards", icon: <BsTrophy size={24} /> },
  { text: "Projects", icon: <BsFolder size={24} /> },
];
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

  const userAvailable = useMemo(
    () =>
      availability
        ? currentUser?.availability.some((availability) =>
            Boolean(availability.isAvailable)
          )
        : false,
    [availability]
  );

  const haveSkills = Boolean(currentUser?.skills?.length > 0);

  if (isLoadingBasicInfo) {
    return <Loader />;
  }
  return (
    <div className="max-w-[80%] m-auto bg-white border border-gray-200 my-8 rounded-3xl shadow-2xl ">
      <div className="p-8">
        <div className="mb-4">
          <UserBasicInfo user={currentUser} />
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <Button
            text="Request Introduction"
            variant="primary"
            startIcon={<LuMail size={24} />}
          />
          <Button
            text="Shortlist"
            variant="tertiary"
            startIcon={<LuBookmark size={24} />}
          />
          <Button
            text=""
            variant="tertiary"
            rightIcon={<LuUpload size={24} className="text-black" />}
          />
        </div>
        <div className="pt-5">
          <p className="text-sm text-gray-500">{currentUser.summary}</p>
          <div className="flex w-full items-end">
            <div className="flex flex-col mt-5 w-full">
              {haveSkills && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Expert in
                  </h3>
                  <div className="flex flex-col md:justify-between sm:flex-row w-full">
                    <div className="flex flex-wrap gap-2 mt-2 md:mb-2">
                      {currentUser?.skills?.map((expertise) => (
                        <Badge
                          key={expertise}
                          skill={expertise}
                          textColor="text-blue-700"
                          bgColor="bg-blue-100"
                        />
                      ))}
                    </div>
                    <Button
                      text="Hire instantly"
                      variant="secondary"
                      rightIcon={<LuArrowRight size={24} />}
                      raw
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="text-xl border" />
      <div className=" flex bg-gray-50 p-4 flex-wrap">
        {buttons.map((button, index) => (
          <div key={index} className="ml-2">
            <Button
              text={button.text}
              variant="tertiary"
              startIcon={button.icon}
              raw
            />
          </div>
        ))}
      </div>
      <hr className="text-xl border" />
      {userAvailable && (
        <>
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between gap-4 p-0">
              {availability &&
                availability
                  .filter((availability) => availability.isAvailable)
                  .map((availability) => (
                    <AvailabilityCard
                      key={availability.type}
                      title={
                        availability.type === "fullTime"
                          ? "Full-time"
                          : "Part-time"
                      }
                      hours={`Can start ${availability.time}+ hours / week immediately`}
                      salary={`$${availability.salary}`}
                    />
                  ))}
            </div>
          </div>

          <hr className="text-xl font-bold" />
        </>
      )}
      <div className="p-8">
        <div>
          {isLoadingExperiences ? (
            <Skeleton width="w-full" height="h-80" />
          ) : (
            Array.isArray(currentUser?.experiences) && (
              <WorkExperience experiences={currentUser?.experiences} />
            )
          )}
        </div>
      </div>
      <hr className="text-xl font-bold" />
      <div className="p-8">
        <div>
          {isLoadingEducations ? (
            <Skeleton width="w-full" height="h-80" />
          ) : (
            Array.isArray(currentUser?.educations) && (
              <Education educations={currentUser?.educations} />
            )
          )}
        </div>
      </div>
      <hr className="text-xl font-bold" />
      {currentUser?.awards.length > 0 && (
        <Awards awards={currentUser?.awards || []} />
      )}
    </div>
  );
};

export default Page;
