import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ContestCard from "../Contest/ContestCard";
import GridLoader from "../Loader/GridLoader";
import { Link } from "react-router";
//eslint-disable-next-line
import { motion } from "motion/react";

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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {contests.map((contest, index) => (
                        <motion.div key={contest._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                            <ContestCard contest={contest} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
            <div className="text-center">
                <Link to="/contest" className="btn btn-primary rounded-full mt-8 text-2xl px-8 py-6 hover:bg-accent">
                    See All
                </Link>
            </div>
        </div>
    );
};

export default PopularContest;
