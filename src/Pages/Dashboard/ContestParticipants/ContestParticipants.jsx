import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ContestParticipants = () => {
    const { contestId } = useParams();
    const axiosSecure = useAxiosSecure();

    const {data: contestParticipants = []} = useQuery({
        queryKey: ['contestPaticipants', contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest-registrations/${contestId}`)
            return res.data;
        }
    })

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
                                <td>
                                    {
                                        participant?.participantName ? participant.participantName : "Mohammad Rashel"
                                    }
                                </td>
                                <td>{participant.userEmail}</td>
                                <td>{new Date(participant.submittedAt).toLocaleString()}</td>
                                <td>
                                    {
                                        participant.submittedTask ? participant.submittedTask : "Not Submitted"
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-primary">Select as Winner</button>
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