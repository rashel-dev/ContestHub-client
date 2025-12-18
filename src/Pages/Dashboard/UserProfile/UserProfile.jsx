import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { Save, User, MapPin, Trophy, Target, Award } from "lucide-react";
import { toast } from "react-toastify";
import Particles from "../../../Components/Animation/Particles";
import userLogo from "../../../assets/user-logo.png";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const UserProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState(user?.bio || "");
    const [address, setAddress] = useState(user?.address || "");

    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["user-stats", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/stats/${user.email}`);
            return res.data;
        },
    });

    const { data: dbUser = {} } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    React.useEffect(() => {
        if (dbUser) {
            setDisplayName(dbUser.displayName || user?.displayName || "");
            setPhotoURL(dbUser.photoURL || user?.photoURL || "");
            setBio(dbUser.bio || "");
            setAddress(dbUser.address || "");
        }
    }, [dbUser, user]);

    const participated = stats.participated || 0;
    const wins = stats.wins || 0;
    const winRate = participated ? Math.round((wins / participated) * 100) : 0;

    // Default data for when there are no stats yet
    const defaultData = [{ name: "No Data", value: 1 }];
    const hasData = participated > 0;

    const chartData = hasData
        ? [
              { name: "Wins", value: wins },
              { name: "Participations", value: participated - wins },
          ]
        : defaultData;

    const COLORS = hasData ? ["#8b5cf6", "#e5e7eb"] : ["#f3f4f6"]; // Purple/Gray for data, Light Gray for empty

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile({ displayName, photoURL });
            const updatedUser = {
                displayName,
                photoURL,
                bio,
                address,
            };
            await axiosSecure
                .patch(`/users?email=${user.email}`, updatedUser)
                .then(() => {
                    toast.success("Profile updated successfully!");
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[80vh] w-full max-w-6xl mx-auto">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <Particles
                    particleColors={["#8b5cf6", "#ec4899"]}
                    particleCount={50}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    disableRotation={true}
                />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats Card */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Profile Summary Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-purple-500 to-pink-500 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full p-1 bg-linear-to-r from-purple-500 to-pink-500">
                                <img src={photoURL || userLogo} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{displayName}</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{user?.email}</p>
                            <div className="flex justify-center gap-2">
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider rounded-full">
                                    {dbUser?.role || "User"}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Stats Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-500" />
                            Performance
                        </h3>
                        {isLoading ? (
                            <div className="h-64 flex items-center justify-center">
                                <span className="loading loading-spinner loading-md text-purple-500"></span>
                            </div>
                        ) : (
                            <>
                                <div className="h-48 w-full relative">
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={hasData ? 5 : 0} stroke="none">
                                                {chartData.map((_, index) => (
                                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            {hasData && <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />}
                                        </PieChart>
                                    </ResponsiveContainer>
                                    {/* Center Text */}
                                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                        <span className="text-3xl font-bold text-gray-800 dark:text-white">{winRate}%</span>
                                        <span className="text-xs text-gray-500 uppercase">Win Rate</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl text-center">
                                        <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{wins}</p>
                                        <p className="text-xs text-gray-500">Won</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl text-center">
                                        <Award className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{participated}</p>
                                        <p className="text-xs text-gray-500">Joined</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Column: Edit Profile Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 h-full">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Profile</h2>
                            <button className="btn btn-ghost btn-circle">
                                <User className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">📷</div>
                                        <input
                                            type="url"
                                            value={photoURL}
                                            onChange={(e) => setPhotoURL(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Your location"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    {loading ? <span className="loading loading-spinner loading-sm"></span> : <Save className="w-5 h-5" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
