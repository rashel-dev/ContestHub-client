import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ContestCard from "../Contest/ContestCard";
import GridLoader from "../Loader/GridLoader";

const PopularContest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["popular-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests/popular");
            return res.data;
        },
    });

    return (
        <div className="py-12 px-4">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Popular Contests</h2>
            {isLoading ? (
                <GridLoader />
            ) : contests.length === 0 ? (
                <p className="text-center text-gray-500">No popular contests found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {contests.map((contest) => (
                        <ContestCard key={contest._id} contest={contest} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularContest;
