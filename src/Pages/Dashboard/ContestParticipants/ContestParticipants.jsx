import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ContestParticipants = () => {
    const { contestId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: contestParticipants = [], refetch } = useQuery({
        queryKey: ["contestPaticipants", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest-registrations/${contestId}`);
            return res.data;
        },
    });

    const handleSelectWinner = async (participantEmail) => {
        Swal.fire({
            title: "Are you sure to select this participant as winner?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Select!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // get the winner info by email
                    const res = await axiosSecure.get(`/users/${participantEmail}`);
                    const winnerInfo = {
                        winnerName: res.data.displayName,
                        winnerPhoto: res.data.photoURL,
                        winnerEmail: participantEmail,
                    };

                    // update contest winner info into the database
                    await axiosSecure.patch(`/contests/${contestId}`, { winnerInfo });
                    Swal.fire({
                        title: "🎉 Booyah! 🎉",
                        text: "🎉 Winner has been selected! 🎉",
                        icon: "success",
                    });
                    refetch();
                } catch (error) {
                    console.error("Error selecting winner:", error);
                    Swal.fire("Error!", "Failed to select winner.", "error");
                }
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-primary"> Total Participants: {contestParticipants.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Participant Name</th>
                            <th>Participant Email</th>
                            <th>Submitted At</th>
                            <th>Submitted Task</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contestParticipants.map((participant, index) => (
                            <tr key={participant._id}>
                                <th>{index + 1}</th>
                                <td>{participant?.participantName ? participant.participantName : "Mohammad Rashel"}</td>
                                <td>{participant.userEmail}</td>
                                <td>{new Date(participant.submittedAt).toLocaleString()}</td>
                                <td>{participant.submittedTask ? participant.submittedTask : "Not Submitted"}</td>
                                <td>
                                    <button onClick={() => handleSelectWinner(participant.userEmail)} className="btn btn-sm btn-primary">
                                        Select as Winner
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContestParticipants;
