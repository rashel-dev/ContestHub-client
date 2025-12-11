import React from "react";
import useAuth from "./../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [] } = useQuery({
        queryKey: ["myContests", user.email],
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
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyContests;
