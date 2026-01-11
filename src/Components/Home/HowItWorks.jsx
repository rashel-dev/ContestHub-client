import React from "react";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { FaUserPlus, FaTrophy, FaRocket, FaSearch } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUserPlus className="text-4xl" />,
            title: "Create Account",
            description: "Join our community and set up your profile to start your journey.",
            color: "from-blue-500 to-cyan-400",
        },
        {
            icon: <FaSearch className="text-4xl" />,
            title: "Find Contests",
            description: "Browse through various categories and find the perfect contest for you.",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: <FaRocket className="text-4xl" />,
            title: "Submit Entry",
            description: "Showcase your skills and submit your best work to the competition.",
            color: "from-orange-500 to-yellow-500",
        },
        {
            icon: <FaTrophy className="text-4xl" />,
            title: "Win Prizes",
            description: "Get recognized for your talent and win amazing rewards and trophies.",
            color: "from-green-500 to-emerald-500",
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4 bg-primary bg-clip-text text-transparent"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Follow these simple steps to start competing and winning today.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 h-full flex flex-col items-center text-center">
                                <div
                                    className={`w-20 h-20 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center text-white mb-6 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg`}
                                >
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 dark:text-white">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>

                                {index !== steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-300 dark:text-gray-600">
                                            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
