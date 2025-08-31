import React from "react";

const SectorCardSkeleton: React.FC = () => {
  return (
    <div
      className="rounded-2xl flex flex-col border-5 w-full animate-pulse"
      style={{ border: "1px solid #fff" }}
    >
      {/* Header skeleton */}
      <div className="bg-[#07431804] flex items-center justify-center p-4 rounded-t-2xl">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>

      {/* Content skeleton */}
      <div className="flex justify-between p-4 items-center">
        <div className="flex flex-col justify-between gap-2">
          {/* Date skeleton */}
          <div className="flex text-[8px] items-center gap-2">
            <div className="bg-gray-300 rounded-full h-1 w-1"></div>
            <div className="h-2 bg-gray-200 rounded w-16"></div>
          </div>

          {/* Request count skeleton */}
          <div className="flex items-baseline gap-1">
            <div className="h-5 bg-gray-200 rounded w-6"></div>
            <div className="h-2 bg-gray-200 rounded w-12"></div>
          </div>
        </div>

        {/* Arrow button skeleton */}
        <div className="rounded-full p-3 bg-[#07431804]">
          <div className="h-3.5 w-3.5 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SectorCardSkeleton;
