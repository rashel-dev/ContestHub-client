import React from "react";
import { XCircle } from "lucide-react";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { Link, useParams } from "react-router";

const PaymentCancel = () => {
    const { contestId } = useParams();
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 to-red-300 px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center"
            >
                <XCircle className="mx-auto text-red-600 w-20 h-20 mb-6 animate-pulse" />
                <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
                <p className="text-gray-700 mb-6">Oops! Your payment was not completed. No worries, you can try again anytime.</p>
                <Link to={`/payment/${contestId}`} className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                    Retry Payment
                </Link>
                <Link to="/" className="block mt-4 text-red-600 hover:underline">
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default PaymentCancel;
