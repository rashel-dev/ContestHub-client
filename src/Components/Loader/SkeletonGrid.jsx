import React from "react";
import ContestSkeleton from "./ContestSkeleton";

const SkeletonGrid = ({ count = 8 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(count)].map((_, index) => (
                <ContestSkeleton key={index} />
            ))}
        </div>
    );
};

export default SkeletonGrid;
