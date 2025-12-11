import React from "react";
import { MdOutlineAssignmentInd, MdOutlineSpaceDashboard } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router";
import logoImg from "../assets/logo.PNG";
import { IoIosCreate } from "react-icons/io";
import useTheme from "../Hooks/useTheme";

const DashboardLayout = () => {
    // Apply saved theme from localStorage
    useTheme();

    const navigate = useNavigate();

    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                            className="my-1.5 inline-block size-4"
                        >
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </label>
                    <div className="px-4">Navbar Title</div>
                </nav>

                {/* Page content here */}
                <Outlet></Outlet>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow space-y-2">
                        {/* List item */}
                        <li>
                            <button onClick={() => navigate("/")} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <img src={logoImg} alt="" className="w-6 h-6" />
                                <span className="is-drawer-close:hidden">HomePage</span>
                            </button>
                        </li>
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                                {/* Dashboard icon */}
                                <MdOutlineSpaceDashboard className="w-6 h-6" />
                                <span className="is-drawer-close:hidden">Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <Link to="/dashboard/create-contest" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Create Contest">
                                {/* create contest  */}
                                <IoIosCreate className="w-6 h-6" />
                                <span className="is-drawer-close:hidden">Create Contest</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-contests" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Contest">
                                {/* create contest  */}
                                <MdOutlineAssignmentInd className="w-6 h-6" />
                                <span className="is-drawer-close:hidden">My Contest</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
