import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = "user", isLoading: roleLoading } = useQuery({
        queryKey: ["role", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data.role;
        },
    });

    return { role, roleLoading };
};

export default useRole;
