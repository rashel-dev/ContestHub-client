import React from "react";
import useAuth from "../Hooks/useAuth";
import GridLoader from "../Components/Loader/GridLoader";
import useRole from "../Hooks/useRole";
import Lottie from "lottie-react";
import forbidden from "../Components/Animation/forbidden.json";

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <GridLoader></GridLoader>;
    }

    if (role !== "admin") {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Lottie animationData={forbidden} loop={true} autoplay={true}></Lottie>
            </div>
        );
    }

    return children;
};

export default AdminRoute;
