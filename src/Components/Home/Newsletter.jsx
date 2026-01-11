import React from "react";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-gray-900">
            {/* Background with gradient and pattern */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900"></div>
            <div
                className="absolute inset-0 opacity-5 dark:opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-white dark:bg-white/10 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] border border-gray-200 dark:border-white/20 shadow-2xl text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-8 shadow-lg shadow-primary/30">
                            <FaPaperPlane className="text-white text-3xl" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Stay Updated with <span className="text-primary">New Contests</span>
                        </h2>
                        <p className="text-gray-600 dark:text-blue-100 text-lg mb-10 max-w-xl mx-auto opacity-80">
                            Subscribe to our newsletter and never miss an opportunity to showcase your talent and win amazing prizes.
                        </p>

                        <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-8 py-5 rounded-2xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg"
                                required
                            />
                            <button
                                type="submit"
                                className="px-10 py-5 bg-primary hover:bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 text-lg"
                            >
                                Subscribe Now
                            </button>
                        </form>

                        <p className="mt-6 text-gray-400 dark:text-white/40 text-sm">We respect your privacy. Unsubscribe at any time.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
