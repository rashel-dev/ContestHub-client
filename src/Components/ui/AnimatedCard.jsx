import React, { useState } from "react";

const AnimatedCard = ({ children, className = "" }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`relative p-1 rounded-2xl ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-75 blur-sm animate-gradient-rotate"></div>

            {/* Inner glow effect */}
            <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                } animate-gradient-rotate`}
            ></div>

            {/* Main Card Content */}
            <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8">{children}</div>
        </div>
    );
};

export default AnimatedCard;
