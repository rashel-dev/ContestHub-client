import { CheckCircle, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useRef } from "react";

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const calledRef = useRef(false);

    useEffect(() => {

        if(!sessionId || calledRef.current) return;
        calledRef.current = true;

        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
            })
        }
    },[sessionId, axiosSecure])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 max-w-md w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <CheckCircle className="text-green-500 w-20 h-20" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful 🎉</h1>

                {/* Message */}
                <p className="text-gray-600 text-sm mb-6">Thank you for your payment. Your contest entry has been confirmed successfully.</p>

                {/* Divider */}
                <div className="border-t my-6"></div>

                {/* Info */}
                <p className="text-xs text-gray-500 mb-6">A confirmation email has been sent to your registered email address.</p>

                {/* Button */}
                <Link
                    to="/dashboard/my-participated-contests"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition shadow-md"
                >
                    Go to My Contests
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
