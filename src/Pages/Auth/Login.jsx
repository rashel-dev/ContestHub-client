import React, { useState } from "react";
import { MdMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import logoImg from "../../assets/logo.PNG";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = () => {
        console.log("Login:", { email, password });
    };

    return (
            <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
                {/* Login Card */}
                <div className="relative z-10 w-full max-w-md">
                    {/* Animated Border Container */}
                    <div className="relative p-1 rounded-2xl" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        {/* Animated Gradient Border */}
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-75 blur-sm animate-gradient-rotate"></div>

                        {/* Inner glow effect */}
                        <div
                            className={`absolute inset-0 rounded-2xl bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 transition-opacity duration-500 ${
                                isHovered ? "opacity-100" : "opacity-0"
                            } animate-gradient-rotate`}
                        ></div>

                        {/* Main Card Content */}
                        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
                            {/* Logo and Title */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16  mb-4">
                                    <img src={logoImg} alt="" />
                                </div>
                                <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">Contest Hub</h1>
                                <p className="text-gray-600">Welcome back! Please login to your account</p>
                            </div>

                            {/* Login Form */}
                            <div className="space-y-5">
                                {/* Email Field */}
                                <div className="relative group">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MdMail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block text-black w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="relative group">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CiLock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block text-black w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-500 transition-colors"
                                        >
                                            {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer" />
                                        <span className="ml-2 text-gray-600 group-hover:text-purple-600 transition-colors">Remember me</span>
                                    </label>
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                                        Forgot Password?
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-linear-to-r from-purple-600 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
                                >
                                    <span>Sign In</span>
                                    <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white/95 text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login */}

                            {/* Google */}
                            <button className="btn bg-white text-black border-[#e5e5e5] w-full">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <g>
                                        <path d="m0 0H512V512H0" fill="#fff"></path>
                                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                    </g>
                                </svg>
                                Login with Google
                            </button>

                            {/* Sign Up Link */}
                            <p className="mt-6 text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <a href="#" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                                    Sign up now
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes blob {
                        0%,
                        100% {
                            transform: translate(0, 0) scale(1);
                        }
                        25% {
                            transform: translate(20px, -50px) scale(1.1);
                        }
                        50% {
                            transform: translate(-20px, 20px) scale(0.9);
                        }
                        75% {
                            transform: translate(50px, 50px) scale(1.05);
                        }
                    }

                    @keyframes gradient-rotate {
                        0% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                        100% {
                            background-position: 0% 50%;
                        }
                    }

                    .animate-blob {
                        animation: blob 20s infinite;
                    }

                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }

                    .animation-delay-4000 {
                        animation-delay: 4s;
                    }

                    .animation-delay-6000 {
                        animation-delay: 6s;
                    }

                    .animation-delay-8000 {
                        animation-delay: 8s;
                    }

                    .animate-gradient-rotate {
                        background-size: 200% 200%;
                        animation: gradient-rotate 3s ease infinite;
                    }
                `}</style>
            </div>
    );
};

export default Login;
