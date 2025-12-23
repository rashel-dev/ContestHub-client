import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SocialLogin = ({ page }) => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const userInfo = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                };
                //save user to database
                axiosSecure.post("/users", userInfo).then((res) => {
                    console.log("User saved to database", res.data);
                    navigate(location?.state || "/");
                });

                toast.success("Login Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/popup-closed-by-user") {
                    return;
                }
                toast.error("Failed to login with Google", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                });
            });
    };

    return (
        <>
            <button
                onClick={handleGoogleSignIn}
                className="w-full bg-white dark:bg-slate-600 text-black dark:text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
                <FcGoogle className="text-xl" />
                <span>{page === "login" ? "Login with Google" : "Register with Google"}</span>
                <FaArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </button>
        </>
    );
};

export default SocialLogin;
