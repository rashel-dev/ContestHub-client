import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ page }) => {
    const handleGoogleSignIn = () => {
        console.log("Google Sign-In");
    };

    return (
        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
            <FcGoogle />
            {page === "login" ? "Login with Google" : "Register with Google"}
        </button>
    );
};

export default SocialLogin;
