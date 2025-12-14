import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import GridLoader from "../../../Components/Loader/GridLoader";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";

const Payment = () => {
    const { contestId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: contest, isLoading } = useQuery({
        queryKey: ["contestPayment", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${contestId}`);
            return res.data;
        },
    });

    const handlePayment = async () => {
        const paymentInfo = {
            contestId: contest._id,
            contestName: contest.contestName,
            entryPrice: contest.entryPrice,
            userEmail: user.email,
            userName: user.displayName,
        };

        const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
        window.location.href = res.data.url;    
    };

    if (isLoading) {
        return <GridLoader></GridLoader>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 md:p-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-primary">Complete Your Payment</h1>
                    <p className="text-gray-500 text-sm mt-1">Secure & fast checkout</p>
                </div>

                {/* Contest Summary */}
                <div className="bg-gray-100 p-4 rounded-xl mb-6">
                    <h3 className="text-lg font-medium text-gray-700">{contest.contestName}</h3>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <p>Entry Fee</p>
                        <p className="font-bold text-gray-800">${contest.entryPrice}</p>
                    </div>
                </div>

                {/* Pay Now Button */}
                <button
                    onClick={handlePayment}
                    className="w-full bg-linear-to-r from-primary to-accent text-white font-semibold py-3 rounded-lg hover:from-primary/90 hover:to-accent/90 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                    Pay Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Bottom Note */}
                <p className="mt-4 text-center text-xs text-gray-500 flex justify-center items-center gap-1">
                    <Lock size={16} /> Payments are secured.
                </p>
            </motion.div>
        </div>
    );
};

export default Payment;
