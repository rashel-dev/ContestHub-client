import React, { useEffect, useState } from "react";
import Logo from "../ui/Logo";
import { Link, NavLink } from "react-router";
import userLogo from "../../assets/user-logo.png";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
    // Initialize state from localStorage directly
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });

    // Apply theme to DOM on mount and when darkMode changes
    useEffect(() => {
        const theme = darkMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
    }, [darkMode]);

    //toggle dark mode
    const toggleDarkMode = () => {
        const newTheme = !darkMode;
        setDarkMode(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    const menuItems = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/contest">Contest</NavLink>
            </li>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {" "}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
                        </svg>
                    </div>

                    {/* small device nav menu  */}

                    <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2">
                        {menuItems}
                        <li>
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="text-xl">
                    <Logo />
                </Link>
            </div>

            {/* large device nav menu */}

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{menuItems}</ul>
            </div>
            <div className="navbar-end">
                {/* dark mode toggle button */}
                <button
                    onClick={toggleDarkMode}
                    className={`relative w-16 h-8 sm:w-20 sm:h-9 flex items-center px-1 rounded-full bg-linear-to-r from-orange-400 to-orange-600 shadow-lg hover:shadow-xl hover:cursor-pointer transition-all duration-300 mr-2`}
                >
                    <div
                        className={`absolute left-0.5 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center transition-all duration-500 ${
                            darkMode ? "translate-x-8 sm:translate-x-11" : "translate-x-0"
                        }`}
                    >
                        {darkMode ? <FaMoon size={14} className="text-blue-700 sm:text-base" /> : <FaSun size={14} className="text-yellow-500 sm:text-base" />}
                    </div>

                    <div className="flex w-full justify-between items-center px-2 sm:px-2.5 text-white font-semibold">
                        <FaSun size={12} className="sm:text-sm" />
                        <FaMoon size={12} className="sm:text-sm" />
                    </div>
                </button>

                <img src={userLogo} alt="user-image" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-secondary sm:mr-2" />
                <a className="btn btn-sm sm:btn-md hidden sm:inline-flex bg-primary text-white">Login</a>
            </div>
        </div>
    );
};

export default Navbar;
