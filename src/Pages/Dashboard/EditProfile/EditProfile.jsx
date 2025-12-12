import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { Save, User, Image } from "lucide-react";
import { toast } from "react-toastify";

const EditProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile({ displayName, photoURL });
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <img src={photoURL || "/default-avatar.png"} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-purple-300 shadow-lg" />
                        <label htmlFor="photoURL" className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-pink-500 transition">
                            <Image className="w-5 h-5 text-white" />
                        </label>
                    </div>
                    <input
                        id="photoURL"
                        type="url"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="Paste new photo URL"
                        className="mt-4 w-64 px-4 py-2 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-gray-50"
                    />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
