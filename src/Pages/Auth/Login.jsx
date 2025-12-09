import React, { useState } from "react";
import { MdMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import logoImg from "../../assets/logo.PNG";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../../Components/ui/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const { signInUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSignIn = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then((result) => {
                console.log(result.user);
                toast.success("Login successfully");
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/invalid-credential") {
                    toast.error("Invalid credentials. Please check your email and password.");
                }
                else if (error.code === "auth/user-not-found") {
                    toast.error("User not found with this email");
                }else {
                    toast.error("Login failed. Please try again");
                }
            });
    };



    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated Stained Glass Background */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-900 via-blue-900 to-cyan-900">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-8000"></div>
                </div>

                {/* Stained Glass Pattern Overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="stained-glass" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                            <polygon points="0,0 100,0 50,86.6" fill="rgba(147,51,234,0.3)" />
                            <polygon points="100,0 200,0 150,86.6" fill="rgba(59,130,246,0.3)" />
                            <polygon points="50,86.6 150,86.6 100,173.2" fill="rgba(236,72,153,0.3)" />
                            <polygon points="0,0 50,86.6 0,173.2" fill="rgba(234,179,8,0.3)" />
                            <polygon points="150,86.6 200,0 200,173.2" fill="rgba(6,182,212,0.3)" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#stained-glass)" />
                </svg>
            </div>
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
                        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-5">
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
                                        type="email"
                                        {...register("email", { required: true })}
                                        className="block text-black w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 mt-2">Email is required</p>}
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
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", { required: true })}
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
                                {errors.password && <p className="text-red-500 mt-2">Password is required</p>}
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
                                className="w-full bg-linear-to-r from-purple-600 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
                            >
                                <span>Sign In</span>
                                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

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
                        <SocialLogin page="login"></SocialLogin>

                        {/* Sign Up Link */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
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
