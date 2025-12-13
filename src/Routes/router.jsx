import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Contest from "../Pages/Contest/Contest";
import AboutUs from "../Pages/AboutUs/Aboutus";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AuthLayout from "../Layout/AuthLayout";
import Error from "../Pages/Error/Error";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import MyContests from "../Pages/Dashboard/MyContests/MyContests";
import CreateContest from "../Pages/Dashboard/CreateContest/CreateContest";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import ManageContests from "../Pages/Dashboard/ManageContests/ManageContests";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/contest",
                element: <Contest></Contest>,
            },
            {
                path: "/contest/:id",
                element: (
                    <PrivateRoute>
                        <ContestDetails></ContestDetails>
                    </PrivateRoute>
                ),
            },
            {
                path: "/about",
                element: <AboutUs></AboutUs>,
            },
            {
                path: "/payment/:contestId",
                element: <Payment></Payment>,
            }
        ],
    },
    {
        path: "/",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>
        ),
        children: [
            {
                path: "create-contest",
                element: <CreateContest></CreateContest>,
            },
            {
                path: "my-contests",
                element: <MyContests></MyContests>,
            },
            {
                path: "manage-users",
                element: <ManageUser></ManageUser>
            },
            {
                path: "manage-contests",
                element: <ManageContests></ManageContests>,
            },
            {
                path: "user-profile",
                element: <UserProfile></UserProfile>,
            },
            
        ],
    },
    {
        path: "*",
        element: <Error></Error>,
    },
]);

export default router;
