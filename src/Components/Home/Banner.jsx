import React, { useState } from "react";
import bannerImg from "../../assets/banner1.jpg";
import { FaSearch, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router";
//eslint-disable-next-line
import { motion } from "motion/react";

const Banner = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/contest?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
        }
    };

    return (
        <div className="relative w-full h-[80vh] bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url(${bannerImg})` }}>
            {/* linear Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-900/80 via-blue-900/70 to-cyan-900/80"></div>

            {/* Animated particles effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-40 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                {/* Trophy Icon */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="mb-6 flex justify-center">
                    <div className="bg-linear-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-2xl animate-pulse">
                        <FaTrophy className="text-5xl text-white" />
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                    Welcome to <span className="bg-linear-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">ContestHub</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-xl md:text-2xl text-gray-100 mb-8 font-light drop-shadow-lg">
                    Discover, Compete, and Win Amazing Prizes
                </motion.p>

                {/* Description */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
                    Join thousands of participants in exciting contests. Showcase your skills, challenge yourself, and compete for incredible rewards!
                </motion.p>

                {/* Search Bar */}
                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mb-12" onSubmit={handleSearch}>
                    <div className="relative max-w-2xl mx-auto">
                        <div className="pointer-events-none absolute -inset-3 z-0 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-xl opacity-70"></div>
                        <div className="relative flex gap-2 items-center bg-white rounded-full shadow-2xl overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search for contests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 px-6 py-4 text-gray-800 text-base md:text-lg focus:outline-none bg-transparent"
                            />
                            <button
                                type="submit"
                                className="bg-linear-to-r from-primary to-accent text-white px-6 md:px-8 py-5 hover:from-primary/90 hover:to-accent/90 transition-all duration-300 flex items-center gap-2 font-semibold cursor-pointer"
                            >
                                <FaSearch className="text-xl" />
                                <span className="hidden md:inline">Search</span>
                            </button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default Banner;
