import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import GridLoader from "../../../Components/Loader/GridLoader";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    if (isLoading) {
        return <GridLoader></GridLoader>;
    }
    return (
        <div className="p-4">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <img src={user.photoURL} className="w-12 h-12 rounded-full" alt="" />
                                </td>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {/* Action buttons can be added here */}
                                    <button className="btn btn-sm btn-success mr-2">Make user</button>
                                    <button className="btn btn-sm btn-secondary mr-2">Make Creator</button>
                                    <button className="btn btn-sm btn-primary ">Make Admin</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
