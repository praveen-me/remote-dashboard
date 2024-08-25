import React from "react";

const ProfileCardShimmer = () => {
  return (
    <div className="mx-auto p-6 border border-gray-200 rounded-lg shadow-lg flex flex-col w-full md:w-[700px] min-h-[300px] space-y-4 my-8 bg-white animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex-1">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
        </div>
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>

      <div className="flex justify-between">
        <div className="w-1/2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="h-4 bg-gray-300 rounded w-1/2 ml-auto"></div>
          <div className="flex gap-2 mt-2">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardShimmer;
