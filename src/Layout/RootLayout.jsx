import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import useAuth from "../Hooks/useAuth";
import GridLoader from "../Components/Loader/GridLoader";
import useTheme from "../Hooks/useTheme";

const RootLayout = () => {
    const { loading } = useAuth();

    // Apply saved theme from localStorage
    useTheme();

    // Show loader while checking authentication on page refresh
    if (loading) {
        return <GridLoader />;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
