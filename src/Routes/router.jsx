import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Contest from "../Pages/Contest/Contest";
import AboutUs from "../Pages/AboutUs/Aboutus";

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
]);

export default router;
