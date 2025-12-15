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
import MyParticipatedContests from "../Pages/Dashboard/MyParticipatedContests/MyParticipatedContests";
import MyWinningContests from "../Pages/Dashboard/MyWinningContests/MyWinningContests";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import EditContest from "../Pages/Dashboard/EditContest/EditContest";
import ContestSubmissions from "../Pages/Dashboard/ContestParticipants/ContestParticipants";
import Leaderboard from "../Pages/Leaderboard/Leaderboard";

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
                path: "/leaderboard",
                element: <Leaderboard></Leaderboard>,
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
                element: (
                    <PrivateRoute>
                        <Payment></Payment>
                    </PrivateRoute>
                ),
            },
            {
                path: "/payment-success",
                element: (
                    <PrivateRoute>
                        <PaymentSuccess></PaymentSuccess>
                    </PrivateRoute>
                ),
            },
            {
                path: "/payment-cancel/:contestId",
                element: (
                    <PrivateRoute>
                        <PaymentCancel></PaymentCancel>
                    </PrivateRoute>
                ),
            },
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
                path: "see-submissions/:contestId",
                element: <ContestSubmissions></ContestSubmissions>
            },
            {
                path: "edit-contest/:contestId",
                element: <EditContest></EditContest>
            },
            {
                path: "manage-users",
                element: <ManageUser></ManageUser>,
            },
            {
                path: "manage-contests",
                element: <ManageContests></ManageContests>,
            },
            {
                path: "user-profile",
                element: <UserProfile></UserProfile>,
            },
            {
                path: "my-participated-contests",
                element: <MyParticipatedContests></MyParticipatedContests>,
            },
            {
                path: "my-winning-contests",
                element: <MyWinningContests></MyWinningContests>,
            },
        ],
    },
    {
        path: "*",
        element: <Error></Error>,
    },
]);

export default router;
