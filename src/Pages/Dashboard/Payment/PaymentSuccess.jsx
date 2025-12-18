import { CheckCircle, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useRef } from "react";
import { useState } from "react";
// eslint-disable-next-line
import { motion } from "framer-motion";
const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const calledRef = useRef(false);

    useEffect(() => {
        if (!sessionId || calledRef.current) return;
        calledRef.current = true;

        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then((res) => {
                console.log(res.data);
                setPaymentInfo(res.data);
            });
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-green-900/20 dark:to-gray-900 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-10 max-w-lg w-full text-center border border-gray-200 dark:border-gray-700"
            >
                {/* Icon */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ delay: 0.2, duration: 0.7, type: "spring" }}>
                    <CheckCircle className="text-green-500 w-24 h-24 mx-auto" />
                </motion.div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-6 mb-2">Payment Successful!</h1>

                {/* Message */}
                <p className="text-gray-600 dark:text-gray-400 mb-8">Thank you! Your contest entry has been confirmed.</p>

                {/* Transaction ID */}
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 rounded-xl p-4 mb-8">
                    <p className="text-sm text-green-800 dark:text-green-300">Your Transaction ID</p>
                    <p className="text-lg font-mono font-semibold text-green-900 dark:text-white break-all">{paymentInfo.transactionId || "Processing..."}</p>
                </div>

                {/* Info */}
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-8">A confirmation has been sent to your registered email address.</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/dashboard/my-participated-contests"
                        className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-xl transition shadow-lg transform hover:-translate-y-0.5"
                    >
                        My Contests
                        <ArrowRight size={18} />
                    </Link>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;
