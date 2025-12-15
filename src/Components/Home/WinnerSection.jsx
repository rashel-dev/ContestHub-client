import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const WinnerSection = () => {
    const axiosSecure = useAxiosSecure();
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const res = await axiosSecure.get("/latest-winners");
                setWinners(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWinners();
    }, [axiosSecure]);

    if (loading) {
        return <p className="text-center text-lg animate-pulse">Loading winners...</p>;
    }

    return (
        <div className="py-12 bg-linear-to-r from-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Inspiring Text */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-purple-700">🏆 Latest Winners</h2>
                    <p className="mt-2 text-lg md:text-xl text-gray-600">Celebrate success, embrace excellence, and get inspired to chase your own dreams! 💫</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {winners.map((winner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center border border-purple-200 hover:shadow-2xl transition-all"
                        >
                            <div className="relative">
                                <img src={winner.winnerPhoto} alt={winner.winnerName} className="w-28 h-28 rounded-full object-cover border-4 border-purple-400 shadow-md" />
                                <Trophy className="absolute -top-3 -right-3 w-8 h-8 text-yellow-400 animate-bounce" />
                            </div>

                            <h3 className="mt-4 text-xl font-semibold text-purple-700">{winner.winnerName}</h3>
                            <p className="text-gray-500 mt-1">{winner.contestName}</p>
                            <p className="mt-2 font-bold text-green-500">${winner.prizeAmount}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WinnerSection;
