import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Contest from "../Pages/Contest/Contest";
import AboutUs from "../Pages/AboutUs/Aboutus";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AuthLayout from "../Layout/AuthLayout";
import Error from "../Pages/Error/Error";

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
                path: "/about",
                element: <AboutUs></AboutUs>,
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
        path: "*",
        element: <Error></Error>,
    },
]);

export default router;
