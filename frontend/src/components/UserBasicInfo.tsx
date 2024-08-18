import Button from "@/components/button";
import Image from "next/image";

interface UserBasicInfoProps {
  user: User;
  showOpenLink?: boolean;
}

export const UserBasicInfo = ({ user, showOpenLink }: UserBasicInfoProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={user.profilePic}
        alt={user.name}
        width={64}
        height={64}
        className="rounded-full border border-gray-300"
      />
      <div className="flex flex-1 justify-between items-center">
        <h2 className="text-lg font-semibold">
          {user.name} | Exp: {user.experience} | {user.location}
        </h2>
        {showOpenLink && (
          <Button
            text="View profile"
            variant="primary"
            asLink
            href="/profile/7969"
          />
        )}
      </div>
    </div>
  );
};
