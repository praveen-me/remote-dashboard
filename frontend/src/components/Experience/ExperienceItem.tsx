import React from "react";
import Image from "next/image";

interface ExperienceItemProps {
  title: string;
  company: string;
  description: string;
  logoSrc: string;
  startDate: string;
  endDate: string;
  isLast?: boolean; // To conditionally remove the line from the last item
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  company,
  description,
  logoSrc,
  startDate,
  endDate,
  isLast = false,
}) => {
  return (
    <div className="relative flex pb-4">
      {/* Vertical Line */}
      {!isLast && (
        <span className="absolute left-[25px] top-[50px] bottom-0 w-px bg-gray-300 z=[-10]" />
      )}
      <div className="flex space-x-4 w-full">
        <div className="flex-shrink-0">
          <Image
            src={logoSrc}
            alt={`${company} logo`}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <span className="text-sm text-gray-500">
              {/* // TODO: Fix logic if dates are missing */}
              {startDate && `${startDate} -`} {endDate || "Present"}
            </span>
          </div>
          <p className="text-sm text-gray-700">{company}</p>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;
