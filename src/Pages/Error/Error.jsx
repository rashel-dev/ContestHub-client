import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animationData from "../../assets/Page Not Found 404.lottie";
import { useNavigate } from "react-router";

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Lottie Animation */}
            <div className="w-full max-w-4xl mx-auto h-50vh">
                <DotLottieReact src={animationData} loop autoplay className="w-full h-full" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <button onClick={() => navigate("/")} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition">
                    Go Home
                </button>
                <button onClick={() => navigate(-1)} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Error;
