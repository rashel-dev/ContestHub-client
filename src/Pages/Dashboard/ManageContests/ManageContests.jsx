import React from "react";
import GridLoader from "../../../Components/Loader/GridLoader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading, refetch } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        },
    });

    const updateContestStatus = (id, status) => {
        const updateInfo = { approvalStatus: status };
        axiosSecure.patch(`/contests/${id}`, updateInfo).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: "success",
                    title: `Contest ${status} Successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });

    };

    const handleApprovedContest = (id) => {
        updateContestStatus(id, "approved");
    };

    const handleRejectContest = (id) => {
        updateContestStatus(id, "rejected");
    }

    if (isLoading) {
        return <GridLoader></GridLoader>;
    }

    return (
        <div className="p-4">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">Total Contest: {contests.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contest Name</th>
                            <th>Creator Name</th>
                            <th>Creator Email</th>
                            <th>Approval Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest, index) => (
                            <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td>{contest.contestName}</td>
                                <td>{contest.creatorName}</td>
                                <td>{contest.creatorEmail}</td>
                                <td>
                                    {/* Action buttons can be added here */}
                                    {contest.approvalStatus === "pending" && (
                                        <>
                                            <button onClick={() => handleApprovedContest(contest._id)} className="btn btn-sm btn-success mr-2">
                                                Approve
                                            </button>
                                            <button onClick={() => handleRejectContest(contest._id)} className="btn btn-sm btn-error">
                                                reject
                                            </button>
                                        </>
                                    )}
                                    {contest.approvalStatus === "approved" && <span className="text-success">Approved</span>}
                                    {contest.approvalStatus === "rejected" && <span className="text-error">Rejected</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContests;
