import React, { useState, useEffect } from "react";
import { DollarSign, Users, Award, Clock, Trophy, User, FileText } from "lucide-react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import GridLoader from "../../Components/Loader/GridLoader";
import useAuth from "../../Hooks/useAuth";

const ContestDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [isEnded, setIsEnded] = useState(false);
    const { user } = useAuth();


    const { data: registrationData } = useQuery({
        queryKey: ["contest-registered", id, user?.email],
        enabled: !!user?.email && !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest-registered?contestId=${id}&email=${user.email}`);
            return res.data;
        },
    });

    const isRegistered = registrationData?.registered;

    // Fetch contest data
    const {
        data: contest,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["contest", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        },
    });

    // Countdown timer effect
    useEffect(() => {
        if (!contest?.deadline) return;

        const deadline = new Date(contest.deadline);
        const updateCountdown = () => {
            const now = new Date();
            const difference = deadline - now;

            if (difference <= 0) {
                setIsEnded(true);
                setTimeRemaining(null);
                return;
            }

            setIsEnded(false);
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeRemaining({ days, hours, minutes, seconds });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [contest?.deadline]);

    if (isLoading) {
        return <GridLoader />;
    }

    if (error || !contest) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Contest Not Found</h2>
                    <Link to="/contest" className="btn btn-primary">
                        Back to Contests
                    </Link>
                </div>
            </div>
        );
    }

    const { contestName, contestBanner, description, taskInstruction, entryPrice, prizeAmount, participants, contestCategory, winnerName, winnerPhoto, creatorName } = contest;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Contest Banner */}
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl mb-8">
                    <img src={contestBanner} alt={contestName} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold">{contestCategory}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{contestName}</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contest Info Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Participants */}
                            <div className="bg-white rounded-xl p-4 shadow-md">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-green-600" />
                                    <span className="text-sm text-gray-500">Participants</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{participants || 0}</p>
                            </div>

                            {/* Entry Price */}
                            <div className="bg-white rounded-xl p-4 shadow-md">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign className="w-5 h-5 text-primary" />
                                    <span className="text-sm text-gray-500">Entry Fee</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">${entryPrice}</p>
                            </div>

                            {/* Prize Amount */}
                            <div className="bg-white rounded-xl p-4 shadow-md">
                                <div className="flex items-center gap-2 mb-2">
                                    <Award className="w-5 h-5 text-accent" />
                                    <span className="text-sm text-gray-500">Prize</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">${prizeAmount}</p>
                            </div>

                            {/* Creator */}
                            <div className="bg-white rounded-xl p-4 shadow-md">
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm text-gray-500">Creator</span>
                                </div>
                                <p className="text-lg font-semibold text-gray-900 truncate">{creatorName}</p>
                            </div>
                        </div>

                        {/* Deadline Countdown */}
                        <div className="bg-linear-to-r from-primary to-accent rounded-xl p-4 sm:p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-6 h-6 text-white" />
                                <h3 className="text-xl font-bold text-white">Deadline</h3>
                            </div>
                            {isEnded ? (
                                <div className="text-center py-4">
                                    <p className="text-3xl font-bold text-white">Contest Ended</p>
                                </div>
                            ) : timeRemaining ? (
                                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                                    <div className="text-center bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-2xl sm:text-3xl font-bold text-white">{timeRemaining.days}</p>
                                        <p className="text-sm text-white/90">Days</p>
                                    </div>
                                    <div className="text-center bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-2xl sm:text-3xl font-bold text-white">{timeRemaining.hours}</p>
                                        <p className="text-sm text-white/90">Hours</p>
                                    </div>
                                    <div className="text-center bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-2xl sm:text-3xl font-bold text-white">{timeRemaining.minutes}</p>
                                        <p className="text-sm text-white/90">Minutes</p>
                                    </div>
                                    <div className="text-center bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-2xl sm:text-3xl font-bold text-white">{timeRemaining.seconds}</p>
                                        <p className="text-sm text-white/90">Seconds</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-white">Calculating...</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-primary" />
                                Contest Description
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
                        </div>

                        {/* Task Instructions */}
                        {taskInstruction && (
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-accent" />
                                    Task Instructions
                                </h2>
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{taskInstruction}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Winner Section */}
                        {winnerName && winnerPhoto && (
                            <div className="bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <Trophy className="w-6 h-6 text-white" />
                                    <h3 className="text-xl font-bold text-white">Winner</h3>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                        <img src={winnerPhoto} alt={winnerName} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-xl font-bold text-white">{winnerName}</p>
                                    <p className="text-white/90 mt-2">Congratulations! 🎉</p>
                                </div>
                            </div>
                        )}

                        {/* Register Button */}
                        <div className="bg-white rounded-xl p-6 shadow-md sticky top-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Join This Contest</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Entry Fee</span>
                                    <span className="text-xl font-bold text-primary">${entryPrice}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Prize Pool</span>
                                    <span className="text-xl font-bold text-accent">${prizeAmount}</span>
                                </div>
                                <Link
                                    to={`/payment/${contest._id}`}
                                    onClick={(e) => {
                                        if (isEnded || isRegistered) e.preventDefault();
                                    }}
                                    className={`btn w-full py-3 font-semibold transition ${
                                        isEnded || isRegistered ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-linear-to-r from-primary to-accent text-white hover:opacity-90"
                                    }`}
                                >
                                    {isEnded ? "Contest Ended" : isRegistered ? "Already Registered" : "Register Now"}
                                </Link>
                                {isRegistered && !isEnded && (
                                    <div>
                                        <button className="btn btn-primary w-full">Submit Your Task</button>
                                    </div>
                                )}
                                {!isEnded && <p className="text-sm text-gray-500 text-center mt-2">Join this contest and showcase your skills</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;
