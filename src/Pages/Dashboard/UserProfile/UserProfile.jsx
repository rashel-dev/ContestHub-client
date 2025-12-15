import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { Save, User, Image } from "lucide-react";
import { toast } from "react-toastify";
import Particles from "../../../Components/Animation/Particles";
import userLogo from "../../../assets/user-logo.png"
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

    const participated = stats.participated || 0;
    const wins = stats.wins || 0;

    const winRate = participated ? Math.round((wins / participated) * 100) : 0;

    const chartData = [
        { name: "Wins", value: wins },
        { name: "Losses", value: participated - wins },
    ];

    const COLORS = ["#22c55e", "#ef4444"];

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile({ displayName, photoURL });
            //update user in database
            const updatedUser = {
                displayName,
                photoURL,
                bio,
                address,
            };
            await axiosSecure.patch(`/users?email=${user.email}`, updatedUser)
            .then(res => {
                console.log(res.data);
                toast.success("Profile updated successfully!");
            })
            .catch(err => {
                console.error(err);
            })

        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden p-4">
            {/* Particles Background */}
            <div className="absolute inset-0 z-0">
                <Particles
                    particleColors={["#ff6347", "#ff4500"]}
                    particleCount={100} // Lowered count for better performance
                    particleSpread={5} // Reduced spread for tighter control
                    speed={0.1}
                    particleBaseSize={50}
                    moveParticlesOnHover={true}
                    alphaParticles={true} // Allow transparency
                    disableRotation={false} // Disable unnecessary rotations
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* win parcentage chart  */}
                <div className="p-8 flex flex-col items-center justify-center gap-6">
                    <h2 className="text-2xl font-bold text-center">📊 Win Percentage</h2>

                    {isLoading ? (
                        <p className="animate-pulse">Loading stats...</p>
                    ) : (
                        <>
                            <div className="w-full h-[300px]">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4}>
                                            {chartData.map((_, index) => (
                                                <Cell key={index} fill={COLORS[index]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="text-center space-y-1">
                                <p className="text-lg font-semibold">🏆 Wins: {wins}</p>
                                <p className="text-lg font-semibold">🎯 Participated: {participated}</p>
                                <p className="text-3xl font-extrabold text-green-500">{winRate}%</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Edit profile section */}
                <div className="relative z-10 min-h-screen flex items-center justify-center p-4 ">
                    <div className="w-full max-w-xl bg-transparent rounded-3xl shadow-2xl p-8">
                        <div className="flex flex-col items-center mb-8">
                            <img src={photoURL || userLogo} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-purple-300 shadow-lg" />

                            <input
                                id="photoURL"
                                type="url"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                placeholder="Paste new photo URL"
                                className="mt-4 w-64 px-4 py-2 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 dark:bg-transparent"
                                required
                                pattern="https?://.+" // Ensure it's a valid URL format
                            />
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white dark:bg-transparent dark:focus:bg-transparent"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white dark:bg-transparent dark:focus:bg-transparent"
                                    rows={3}
                                    placeholder="Write something about yourself..."
                                    disabled={loading}
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white dark:bg-transparent dark:focus:bg-transparent"
                                    placeholder="Enter your address"
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all 
                                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:scale-105"}`}
                            >
                                {loading ? <div className="animate-spin w-5 h-5 border-2 border-t-2 border-white rounded-full"></div> : <Save className="w-5 h-5" />}
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
