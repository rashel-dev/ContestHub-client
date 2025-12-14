import React from "react";
import useAuth from "./../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const MyContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: contests = [], refetch } = useQuery({
        queryKey: ["myContests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests?email=${user.email}`);
            return res.data;
        },
    });



    const handleContestDelete = (contestId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/contests/${contestId}`)
                .then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your contest has been deleted.",
                            icon: "success",
                        });

                        //refresh the contests list after delete a contest
                        refetch();               
                    }
                })
                .catch((error) => {
                    console.error("Error deleting contest:", error);
                    toast.error("Failed to delete the contest. Please try again.");
                });
                
            }
        });
    };
    
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
                                <td>{contest.approvalStatus}</td>


                                {/* actions buttons */}
                                <td>
                                    <div className="flex gap-2">
                                        {contest.approvalStatus === "pending" ? (
                                            <>
                                                <button onClick={() => navigate(`/dashboard/edit-contest/${contest._id}`)}
                                                  className="btn btn-sm btn-secondary">Edit</button>
                                                <button onClick={() => handleContestDelete(contest._id)} className="btn btn-sm btn-error">
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-sm btn-secondary" disabled>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-error" disabled>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <button onClick={() => navigate(`/dashboard/see-submissions/${contest._id}`)} className="btn btn-sm btn-info">View</button>
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
