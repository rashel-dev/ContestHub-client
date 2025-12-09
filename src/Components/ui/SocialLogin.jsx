import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
// import { useNavigate } from "react-router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SocialLogin = ({ page }) => {
    const { signInWithGoogle } = useAuth();

    // const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(user);
                toast.success("Login Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                });
                // navigate("/");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to login with Google",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                })
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
