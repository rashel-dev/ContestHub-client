import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { LayoutDashboard, PlusCircle, ListTodo, Trophy, UserCircle, Users, ShieldCheck, Menu, LogOut, Home, Award } from "lucide-react";
import logoImg from "../assets/logo.PNG";
import useTheme from "../Hooks/useTheme";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
//eslint-disable-next-line
const SidebarItem = ({ to, icon: Icon, label, end = false }) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                    ? "bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400"
            }`
        }
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
    </NavLink>
);

const DashboardLayout = () => {
    useTheme();
    const { role } = useRole();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        navigate("/");
    };

    return (
        <div className="drawer lg:drawer-open bg-gray-50 dark:bg-gray-900 min-h-screen font-sans max-w-7xl mx-auto">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main Content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700 px-6">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-gray-600 dark:text-gray-300">
                            <Menu className="w-6 h-6" />
                        </label>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-blue-600 hidden md:block">Dashboard Overview</h2>
                    </div>
                    <div className="flex-none gap-4">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-purple-500 ring-offset-2 ring-offset-base-100">
                                <div className="w-10 rounded-full">
                                    <img alt="User" src={user?.photoURL || "https://i.ibb.co/MgsTCcv/avater.jpg"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-1 p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box w-52 border border-gray-100 dark:border-gray-700">
                                <li>
                                    <Link to="/dashboard/user-profile" className="justify-between">
                                        Profile
                                        <span className="badge badge-primary">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-40">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                    {/* Logo Area */}
                    <div className="p-6 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800">
                        <img src={logoImg} alt="Logo" className="w-10 h-10 rounded-lg shadow-md" />
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">ContestHub</h1>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Dashboard</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        <div className="mb-6">
                            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Menu</p>
                            <div className="space-y-1">
                                <SidebarItem to="/" icon={Home} label="Home" />
                                <SidebarItem to="/dashboard/user-profile" icon={UserCircle} label="My Profile" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contests</p>
                            <div className="space-y-1">
                                {role === "creator" && (
                                    <>
                                        <SidebarItem to="/dashboard/create-contest" icon={PlusCircle} label="Create Contest" />
                                        <SidebarItem to="/dashboard/my-contests" icon={ListTodo} label="My Contests" />
                                    </>
                                )}
                                <SidebarItem to="/dashboard/my-participated-contests" icon={Award} label="Participated" />
                                <SidebarItem to="/dashboard/my-winning-contests" icon={Trophy} label="Winning Contests" />
                            </div>
                        </div>

                        {role === "admin" && (
                            <div className="mb-6">
                                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Admin</p>
                                <div className="space-y-1">
                                    <SidebarItem to="/dashboard/manage-users" icon={Users} label="Manage Users" />
                                    <SidebarItem to="/dashboard/manage-contests" icon={ShieldCheck} label="Manage Contests" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer / Logout */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-xl transition-all duration-300"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
