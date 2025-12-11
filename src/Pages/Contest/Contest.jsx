import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ContestCard from "../../Components/Contest/ContestCard";
import GridLoader from "../../Components/Loader/GridLoader";

const Contest = () => {
    const [contests, setContests] = useState([]);
    const [filteredContests, setFilteredContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const axiosSecure = useAxiosSecure();

    // Fetch all contests
    useEffect(() => {
        const fetchContests = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get("/contests");

                // Filter for approved contests only
                const approvedContests = response.data.filter((contest) => contest.approvalStatus === "approved");

                // Further filter to show only contests that haven't ended
                const currentDate = new Date();
                const activeContests = approvedContests.filter((contest) => {
                    const deadline = new Date(contest.deadline);
                    return deadline > currentDate; // Only show contests with future deadlines
                });

                setContests(activeContests);
                setFilteredContests(activeContests);
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, [axiosSecure]);

    

    // Get unique categories
    const categories = ["all", ...new Set(contests.map((contest) => contest.contestCategory))];

    if (loading) {
        return <GridLoader />;
    }

    return (
        <div className="min-h-screen  py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-primary mb-2">All Contests</h1>
                    <p className="text-gray-600 dark:text-accent">Explore and participate in exciting contests</p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search contests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none cursor-pointer"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category === "all" ? "All Categories" : category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition cursor-pointer"
                            >
                                <option value="default">Sort By</option>
                                <option value="participants">Most Participants</option>
                                <option value="deadline">Deadline (Soonest)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-white">
                        Showing <span className="font-semibold text-primary">{filteredContests.length}</span> contest{filteredContests.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {/* Contests Grid */}
                {filteredContests.length > 0 ? (
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredContests.map((contest) => (
                            <ContestCard key={contest._id} contest={contest} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Contests Found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contest;
