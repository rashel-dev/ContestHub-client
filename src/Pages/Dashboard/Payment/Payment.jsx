import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import GridLoader from "../../../Components/Loader/GridLoader";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Lock, ArrowRight, Tag, CreditCard } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";

const Payment = () => {
    const { contestId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    const { data: contest, isLoading } = useQuery({
        queryKey: ["contestPayment", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${contestId}`);
            return res.data;
        },
    });

    const handlePayment = async () => {
        setIsProcessing(true);
        const paymentInfo = {
            contestId: contest._id,
            contestName: contest.contestName,
            entryPrice: contest.entryPrice,
            userEmail: user.email,
            userName: user.displayName,
        };

        try {
            const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
            window.location.href = res.data.url;
        } catch (error) {
            console.error("Payment initiation failed:", error);
            setIsProcessing(false); // Re-enable button on error
        }
    };

    if (isLoading) {
        return <GridLoader></GridLoader>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-linear-to-r from-purple-500 to-blue-500 rounded-full mb-4">
                        <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Payment Checkout</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Securely join your next favorite contest.</p>
                </div>

                {/* Contest Summary */}
                <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 rounded-2xl p-6 mb-8 space-y-4">
                    <div className="flex items-start gap-3">
                        <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 shrink-0" />
                        <div>
                            <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">Contest</p>
                            <p className="text-lg font-semibold text-purple-900 dark:text-white leading-tight">{contest.contestName}</p>
                        </div>
                    </div>
                    <div className="border-t border-purple-200 dark:border-purple-600/40"></div>
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Total Amount</p>
                        <p className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-blue-600">${contest.entryPrice}</p>
                    </div>
                </div>

                {/* Pay Now Button */}
                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 group cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isProcessing ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <>
                            Proceed to Payment
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                {/* Bottom Note */}
                <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 flex justify-center items-center gap-2">
                    <Lock size={14} /> All transactions are secure and encrypted.
                </p>
            </motion.div>
        </div>
    );
};

export default Payment;
