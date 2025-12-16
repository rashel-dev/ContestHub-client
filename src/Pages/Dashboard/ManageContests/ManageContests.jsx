import React, { useState } from "react";
import GridLoader from "../../../Components/Loader/GridLoader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {
        data: contests = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        },
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = contests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(contests.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
    };

    const handleDeleteContest = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This contest will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/contests/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            icon: "success",
                            title: "Contest Deleted Successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        // Refetch contests after successful deletion
                        refetch();
                    }
                });
            }
        });
    };

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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((contest, index) => (
                            <tr key={contest._id}>
                                <th>{indexOfFirstItem + index + 1}</th>
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
                                    {/* {contest.approvalStatus === "pending" && <span className="text-warning">Pending</span>} */}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteContest(contest._id)} className="btn btn-sm btn-error">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="join">
                        <button className="join-item btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            «
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button key={index + 1} className={`join-item btn ${currentPage === index + 1 ? "btn-active btn-primary" : ""}`} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                        <button className="join-item btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            »
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageContests;
