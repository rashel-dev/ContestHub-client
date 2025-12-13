import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import GridLoader from "../../../Components/Loader/GridLoader";
import Swal from "sweetalert2";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // Role actions map
    const roleActions = {
        user: [
            { label: "Make Creator", role: "creator", color: "secondary" },
            { label: "Make Admin", role: "admin", color: "primary" },
        ],
        creator: [
            { label: "Make User", role: "user", color: "success" },
            { label: "Make Admin", role: "admin", color: "primary" },
        ],
        admin: [
            { label: "Make User", role: "user", color: "success" },
            { label: "Make Creator", role: "creator", color: "secondary" },
        ],
    };

    // Update user role
    const handleRoleChange = (userId, newRole) => {
        Swal.fire({
            title: `Change role to ${newRole}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/${userId}/role`, {
                        role: newRole,
                    });

                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            icon: "success",
                            title: `Role changed to ${newRole}`,
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        // Refetch users
                        refetch();
                    }
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to change role",
                        text: err.message,
                    });
                }
            }
        });
    };

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
                            <th>Current Status</th>
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
                                <td>{user.role}</td>
                                <td className="flex gap-2">
                                    {roleActions[user.role]?.map((action) => (
                                        <button key={`${user._id}-${action.role}`} className={`btn btn-sm btn-${action.color}`} onClick={() => handleRoleChange(user._id, action.role)}>
                                            {action.label}
                                        </button>
                                    ))}
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
