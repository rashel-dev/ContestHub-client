import React from 'react';
import GridLoader from '../../../Components/Loader/GridLoader';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests');
            return res.data;
        },
    });

    if (isLoading) {
        return <GridLoader></GridLoader>;
    }

    return (
        <div className="p-4">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">Total Users: {contests.length}</h2>
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
                                    <button className="btn btn-sm btn-success mr-2">Approve</button>
                                    <button className="btn btn-sm btn-error mr-2">Delete</button>
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