import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import logoImg from "../../assets/logo.PNG";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import SocialLogin from "../../Components/ui/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
        };
        updateCanvasSize();

        const particles = [];
        const particleCount = 100;
        const maxDistance = 150;

        const isDarkMode = () => {
            const theme = document.documentElement.getAttribute("data-theme");
            if (theme) return theme === "dark";
            return document.documentElement.classList.contains("dark");
        };

        const createParticle = () => {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 2 + 1,

                update: function () {
                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                },

                draw: function () {
                    const isDark = isDarkMode();
                    ctx.fillStyle = isDark ? "rgba(147, 51, 234, 0.8)" : "rgba(147, 51, 234, 0.6)";
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fill();
                },
            };
        };

        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }

        const drawConnections = () => {
            const isDark = isDarkMode();

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.5;
                        ctx.strokeStyle = isDark ? `rgba(6, 182, 212, ${opacity})` : `rgba(139, 92, 246, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            const isDark = isDarkMode();
            ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.3)" : "rgba(249, 250, 251, 0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawConnections();

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        const isDark = isDarkMode();
        ctx.fillStyle = isDark ? "#0f172a" : "#f9fafb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        animate();

        const handleResize = () => {
            updateCanvasSize();
        };

        window.addEventListener("resize", handleResize);

        const observer = new MutationObserver(() => {
            // Clear canvas on theme change to avoid fade delay
            const isDark = isDarkMode();
            ctx.fillStyle = isDark ? "#0f172a" : "#f9fafb";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-theme"],
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
        };
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleRegistration = (data) => {
        const { email, password } = data;
        setLoading(true);

        registerUser(email, password)
            .then(() => {
                //1. get the photo file by react hook form
                const profileImage = data.photo[0];

                //2. prepare form data for uploading image to imgbb
                const formData = new FormData();
                formData.append("image", profileImage);

                //3. upload image to imgbb server
                axios
                    .post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`, formData)
                    .then((res) => {
                        const photoURL = res.data.data.url;

                        //create user object to store in database
                        const userInfo = {
                            displayName: data.name,
                            email: data.email,
                            photoURL: photoURL,
                        };
                        axiosSecure.post("/users", userInfo).then((res) => {
                            if (res.data.insertedId) {
                                console.log("user info stored in database");
                            }
                        });

                        //4. update user profile with name and photoURL to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL,
                        };
                        updateUserProfile(userProfile)
                            .then(() => {
                                toast.success("Account created successfully");
                                setLoading(false);
                                navigate(location?.state || "/");
                            })
                            .catch((error) => {
                                // console.log(error);
                                setLoading(false);
                                toast.error(error.message);
                            });
                    })
                    .catch((err) => {
                        console.error(err);
                        setLoading(false);
                        toast.error("Image upload failed");
                    });
            })
            .catch((error) => {
                setLoading(false);
                if (error.code === "auth/email-already-in-use") {
                    toast.error("User already exists with this email. Please try another email!");
                } else {
                    toast.error(error.message);
                }
            });
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-8 bg-gray-50 dark:bg-slate-900">
            {/* Animated Canvas Background */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

            {/* Register Card */}
            <div className="relative z-10 w-full max-w-md">
                {/* Animated Border Container */}
                <div className="relative p-1 rounded-2xl" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    {/* Animated linear Border */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-75 blur-sm animate-gradient-rotate"></div>

                    {/* Inner glow effect */}
                    <div
                        className={`absolute inset-0 rounded-2xl bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 transition-opacity duration-500 ${
                            isHovered ? "opacity-100" : "opacity-0"
                        } animate-gradient-rotate`}
                    ></div>

                    {/* Main Card Content */}
                    <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
                        {/* Logo and Title */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                                <img src={logoImg} alt="" />
                            </div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent mb-2">Join Contest Hub</h1>
                            <p className="text-gray-600 dark:text-gray-300">Create your account and start competing</p>
                        </div>

                        {/* Register Form */}
                        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
                            {/* Name Field */}
                            <div className="relative group">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Full Name
                                </label>

                                <div className="relative h-12 flex items-center">
                                    <div className="absolute left-3 text-gray-400">
                                        <FaUser className="text-gray-400 group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400 transition-colors" />
                                    </div>

                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        className="w-full text-gray-900 dark:text-gray-100 bg-white/50 dark:bg-slate-700/50 pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* ERROR message stays OUTSIDE — no effect on height */}
                                {errors.name && <p className="text-red-500 text-sm mt-1">Name is required.</p>}
                            </div>

                            {/* Photo Field */}
                            <div className="relative group">
                                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Photo
                                </label>
                                <div className="relative h-12 flex items-center">
                                    <input
                                        type="file"
                                        {...register("photo", { required: true })}
                                        className="file-input file-input-primary bg-white dark:bg-slate-700/50 dark:border-slate-600 dark:text-gray-200 w-full"
                                    />
                                </div>
                                {errors.photoURL?.type === "required" && <p className="text-red-500">Photo is required.</p>}
                            </div>

                            {/* Email Field */}
                            <div className="relative group">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Email Address
                                </label>
                                <div className="relative h-12 flex items-center">
                                    <div className="absolute left-3 text-gray-400">
                                        <FaEnvelope className="text-gray-400 group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        className="block text-gray-900 dark:text-gray-100 bg-white/50 dark:bg-slate-700/50 w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email?.type === "required" && <p className="text-red-500">Email is required.</p>}
                            </div>

                            {/* Password Field */}
                            <div className="relative group">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Password
                                </label>
                                <div className="relative h-12 flex items-center">
                                    <div className="absolute left-3 text-gray-400">
                                        <FaLock className="text-gray-400 group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/ })}
                                        className="block text-gray-900 dark:text-gray-100 bg-white/50 dark:bg-slate-700/50 w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {/* password validation error message*/}
                                {errors.password?.type === "required" && <p className="text-red-500">Password is required.</p>}
                                {errors.password?.type === "minLength" && <p className="text-red-500">Password must be 6 characters or longer</p>}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-500">Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                                )}
                            </div>

                            {/* Terms & Conditions */}
                            <div className="flex items-start text-sm">
                                <label className="flex items-start cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 mt-0.5 rounded border-gray-300 dark:border-slate-600 dark:bg-slate-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                                        required
                                    />
                                    <span className="ml-2 text-gray-600 dark:text-gray-300 transition-colors">
                                        I agree to the{" "}
                                        <a href="" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                                            Terms & Conditions
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                                            Privacy Policy
                                        </a>
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`w-full bg-linear-to-r from-primary to-accent text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer ${
                                    loading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white/95 dark:bg-slate-800 text-gray-500 dark:text-gray-400">Or sign up with</span>
                            </div>
                        </div>

                        {/* Google */}
                        <SocialLogin page="register"></SocialLogin>

                        {/* Sign In Link */}
                        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                            Already have an account?{" "}
                            <Link to="/login" state={location.state} className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
