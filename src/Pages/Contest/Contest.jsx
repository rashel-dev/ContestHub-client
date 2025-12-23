import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { useSearchParams } from "react-router";
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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();

    // Initialize search term from URL params
    useEffect(() => {
        const querySearch = searchParams.get("search");
        if (querySearch) {
            setSearchTerm(querySearch);
        }
    }, [searchParams]);
    useEffect(() => {
        const fetchContests = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get("/contests");

                // Filter for approved contests only
                const approvedContests = response.data.filter((contest) => contest.approvalStatus === "approved");

                // Further filter to show only contests that haven't ended
                // const currentDate = new Date();
                // const activeContests = approvedContests.filter((contest) => {
                //     const deadline = new Date(contest.deadline);
                //     return deadline > currentDate; // Only show contests with future deadlines
                // });

                setContests(approvedContests);
                setFilteredContests(approvedContests);
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, [axiosSecure]);

    // Handle search, filter, and sort
    useEffect(() => {
        let result = [...contests];

        // Search filter
        if (searchTerm) {
            result = result.filter((contest) => contest.contestName.toLowerCase().includes(searchTerm.toLowerCase()) || contest.contestCategory.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Category filter
        if (selectedCategory !== "all") {
            result = result.filter((contest) => contest.contestCategory === selectedCategory);
        }

        // Sort
        if (sortBy === "participants") {
            result.sort((a, b) => (b.participents || 0) - (a.participents || 0));
        } else if (sortBy === "deadline") {
            result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        }

        setFilteredContests(result);
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, sortBy, contests]);

    // Get unique categories
    const categories = ["all", ...new Set(contests.map((contest) => contest.contestCategory))];

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredContests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredContests.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (loading) {
        return <GridLoader />;
    }

    return (
        <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-primary mb-2">All Contests</h1>
                    <p className="text-gray-600 dark:text-gray-300">Explore and participate in exciting contests</p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8 border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search contests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none cursor-pointer"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category} className="bg-white dark:bg-slate-700">
                                        {category === "all" ? "All Categories" : category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition cursor-pointer"
                            >
                                <option value="default" className="bg-white dark:bg-slate-700">
                                    Sort By
                                </option>
                                <option value="participants" className="bg-white dark:bg-slate-700">
                                    Most Participants
                                </option>
                                <option value="deadline" className="bg-white dark:bg-slate-700">
                                    Deadline (Soonest)
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300">
                        Showing <span className="font-semibold text-primary">{filteredContests.length}</span> contest{filteredContests.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {/* Contests Grid */}
                {currentItems.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {currentItems.map((contest) => (
                                <ContestCard key={contest._id} contest={contest} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12">
                                <div className="join">
                                    <button
                                        className="join-item btn bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        «
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            className={`join-item btn ${
                                                currentPage === index + 1
                                                    ? "btn-active btn-primary"
                                                    : "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                                            }`}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        className="join-item btn bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        »
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-gray-400 dark:text-gray-600 mb-4">
                            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No Contests Found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contest;
