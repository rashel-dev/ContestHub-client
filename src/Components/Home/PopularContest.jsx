import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ContestCard from "../Contest/ContestCard";
import SkeletonGrid from "../Loader/SkeletonGrid";
import { Link } from "react-router";
//eslint-disable-next-line
import { motion } from "motion/react";

const PopularContest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["popular-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests?status=approved&sort=popular&limit=8&upcoming=true");
            return res.data;
        },
    });

    return (
        <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 leading-tight">
                    Our <span className="bg-linear-to-r via-pink-500 from-primary to-secondary bg-clip-text text-transparent">Popular Contests</span>
                </h2>
                {isLoading ? (
                    <SkeletonGrid count={8} />
                ) : contests.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-gray-600 dark:text-gray-400">No popular contests found at the moment.</p>
                        <p className="text-gray-500 dark:text-gray-500 mt-2">Check back later for exciting new contests!</p>
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {contests.map((contest, index) => (
                            <motion.div key={contest._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                                <ContestCard contest={contest} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
                <div className="text-center mt-16">
                    <Link
                        to="/contest"
                        className="inline-flex items-center justify-center px-6 py-2 text-lg font-semibold text-white bg-linear-to-r from-primary to-accent rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        See All
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PopularContest;
