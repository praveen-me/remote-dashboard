import React from "react";

interface BadgeProps {
  skill: string;
  textColor?: string;
  bgColor?: string;
}

const Badge: React.FC<BadgeProps> = ({
  skill,
  textColor = "text-blue-700",
  bgColor = "bg-blue-100",
}) => {
  return (
    <span className={`px-3 py-1 ${bgColor} ${textColor} rounded-full text-sm`}>
      {skill}
    </span>
  );
};

export default Badge;
