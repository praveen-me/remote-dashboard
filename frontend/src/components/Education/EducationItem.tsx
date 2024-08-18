import React from "react";
import Image from "next/image";

interface EducationItemProps {
  degree: string;
  college: string;
  logoSrc: string;
  startDate: string;
  endDate: string;
}

const EducationItem: React.FC<EducationItemProps> = ({
  degree,
  college,
  logoSrc,
  startDate,
  endDate,
}) => {
  return (
    <div className="relative flex pb-4">
      <div className="flex space-x-4 flex-1">
        <div className="flex-shrink-0">
          <Image
            src={logoSrc}
            alt={`${college} logo`}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 justify-between">
          <div className="flex flex-1 justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{degree}</h3>
            <span className="text-sm text-gray-500">
              {startDate} - {endDate}
            </span>
          </div>
          <p className="text-sm text-gray-700 self-end">{college}</p>
        </div>
      </div>
    </div>
  );
};

export default EducationItem;
