import React from "react";

const ContestSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col animate-pulse">
            {/* Banner Skeleton */}
            <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full"></div>

            {/* Content Skeleton */}
            <div className="p-6 flex flex-col flex-1">
                {/* Title Skeleton */}
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-4"></div>

                {/* Description Skeleton */}
                <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>

                {/* Info Grid Skeleton */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                            <div className="space-y-1">
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button Skeleton */}
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mt-auto"></div>
            </div>
        </div>
    );
};

export default ContestSkeleton;
