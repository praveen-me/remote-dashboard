import Button from "@/components/button";
import Image from "next/image";

interface UserBasicInfoProps {
  user: User;
  showOpenLink?: boolean;
}

export const UserBasicInfo = ({ user, showOpenLink }: UserBasicInfoProps) => {
  if (!user) return;

  return (
    <div className="flex items-center space-x-4">
      <Image
        src={user.profilePic || "https://via.placeholder.com/150"}
        alt={user.name}
        width={64}
        height={64}
        className="rounded-full border border-gray-300"
      />
      <div className="flex flex-1 justify-between items-center">
        <h2 className="text-lg font-semibold">
          {user.name} | Exp: {user.totalExperience} | {user.country}
        </h2>
        {showOpenLink && (
          <Button
            text="View profile"
            variant="primary"
            asLink
            href={`/profile/${user.userId}`}
          />
        )}
      </div>
    </div>
  );
};
