import React from "react";
import useAuth from "./../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [] } = useQuery({
        queryKey: ["myContests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests?email=${user.email}`);
            return res.data;
        },
    });

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4 text-primary">You have created {contests.length} contest</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contest Name</th>
                            <th>Payment Status</th>
                            <th>Approval Status</th>
                            <th>Actions</th>
                            <th>See Submissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest, index) => (
                            <tr key={contest._id}>
                                <td className="font-bold">{index + 1}</td>
                                <td>{contest.contestName}</td>
                                <td>
                                    {contest.paymentStatus === "pending" ? (
                                        <button className="btn btn-primary btn-sm">Pending</button>
                                    ) : (
                                        <button className="btn btn-sm" disabled>
                                            Paid
                                        </button>
                                    )}
                                </td>
                                <td>{contest.approvalStatus}</td>
                                <td className="space-x-2">
                                    {contest.approvalStatus === "pending" ? (
                                        <>
                                            <button className="btn btn-sm btn-secondary">Edit</button>
                                            <button className="btn btn-sm btn-error">Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-sm btn-secondary" disabled>Edit</button>
                                            <button className="btn btn-sm btn-error" disabled>Delete</button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-info">View Submissions</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyContests;
