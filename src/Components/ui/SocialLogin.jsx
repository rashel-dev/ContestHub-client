import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

const SocialLogin = ({ page }) => {
    const { signInWithGoogle } = useAuth();

    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then((result) => {
            // console.log(result.user);
            const user = result.user;
            console.log(user);
            navigate("/");
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
            <FcGoogle />
            {page === "login" ? "Login with Google" : "Register with Google"}
        </button>
    );
};

export default SocialLogin;
