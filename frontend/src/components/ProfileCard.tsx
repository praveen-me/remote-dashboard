import React from "react";
import Badge from "@/components/Badge";
import { UserBasicInfo } from "@/components/UserBasicInfo";

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="mx-auto p-4 border border-gray-200 rounded-lg shadow-lg flex flex-col w-6/12 min-h-[300px] min-w-[700px] mt-8 space-y-4">
      <UserBasicInfo user={user} showOpenLink />

      <p className="text-sm text-gray-700">{user.description}</p>

      <div className="flex flex-1 flex-col justify-end">
        <div className="flex justify-between">
          <div className="flex flex-col w-[60%]">
            <h3 className="text-sm font-bold text-gray-700">Expert in</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.skills.map((skill) => (
                <Badge key={skill} skill={skill} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <h3 className="text-sm font-bold text-gray-700 text-right">
              Commitment
            </h3>
            <div className="flex gap-2 mt-2">
              {user.availability.map((type) => (
                <Badge
                  key={type}
                  skill={type}
                  textColor="text-black"
                  bgColor="bg-slate-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
