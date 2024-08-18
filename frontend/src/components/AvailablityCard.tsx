import React from "react";

interface AvailabilityPropsCard {
  title: string;
  hours: string;
  salary: string;
}

const AvailabilityCard: React.FC<AvailabilityPropsCard> = ({
  title,
  hours,
  salary,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 w-full md:w-5/12 flex flex-col justify-between shadow-sm">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{hours}</p>
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-800">{salary} / month</p>
      </div>
    </div>
  );
};

export default AvailabilityCard;
