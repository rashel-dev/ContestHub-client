import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SocialLogin = ({ page }) => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Login Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                console.error(error);
                if(error.code === "auth/popup-closed-by-user"){
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
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
                <FcGoogle />
                {page === "login" ? "Login with Google" : "Register with Google"}
            </button>
        </>
    );
};

export default SocialLogin;
