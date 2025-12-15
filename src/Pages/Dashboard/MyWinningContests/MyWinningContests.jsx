import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyWinningContests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: winningContests = [] } = useQuery({
        queryKey: ["winningContests"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-winning-contests?email=${user.email}`);
            return res.data;
        },
    });

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-primary">
                {
                    winningContests.length > 0 ? `You have won ${winningContests.length} contests` : "You have not won any contests yet. Try Soul and Heart" 
                }
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contest Name</th>
                            <th>Entry Fee</th>
                            <th>Prize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winningContests.map((contest, index) => (
                            <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td>{contest.contestName}</td>
                                <td>{contest.entryPrice}</td>
                                <td>{contest.prizeAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyWinningContests;
