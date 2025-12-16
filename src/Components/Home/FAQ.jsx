import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
//eslint-disable-next-line
import { motion, AnimatePresence } from "motion/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import faqAnimation from "../../assets/Questions and Answer.lottie";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is ContestHub?",
            answer: "ContestHub is a premier platform where you can discover, participate in, and create various contests. Whether you're a designer, developer, or creative enthusiast, there's a contest for you to showcase your skills and win amazing prizes.",
        },
        {
            question: "How can I participate in a contest?",
            answer: "Participating is easy! Simply browse through our active contests, select one that interests you, and click on the 'Join Contest' button. Follow the specific instructions provided for each contest to submit your entry.",
        },
        {
            question: "Are there any entry fees?",
            answer: "Most contests on ContestHub are free to join. However, some premium or high-reward contests may require a small entry fee. This information is clearly displayed on each contest's details page.",
        },
        {
            question: "How are winners determined?",
            answer: "Winners are selected based on the specific criteria set by the contest organizer. This could involve voting by the community, judging by a panel of experts, or a combination of both. Check the contest rules for details.",
        },
        {
            question: "Can I organize my own contest?",
            answer: "Absolutely! ContestHub empowers you to host your own contests. Simply sign up for an account, go to your dashboard, and click 'Create Contest'. You can set the rules, prizes, and duration to suit your needs.",
        },
        {
            question: "How do I claim my prize?",
            answer: "If you win, you will be notified via email and through your ContestHub dashboard. Prize distribution methods vary (e.g., bank transfer, gift cards, shipping for physical items) and will be coordinated by the contest organizer.",
        },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Visuals & Header */}
                    <div className="relative">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                Frequently Asked <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-cyan-500">Questions</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Have questions? We're here to help. Check out our most common inquiries below or contact our support team for further assistance.
                            </p>

                            {/* Decorative Icon Block */}
                            <div className="hidden lg:flex items-center justify-center w-64 h-64 bg-linear-to-tr from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 rounded-full blur-3xl absolute -top-20 -left-20 opacity-70"></div>
                            <div className="hidden lg:block relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <DotLottieReact src={faqAnimation} loop autoplay className="w-full h-full" />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                                    activeIndex === index ? "ring-2 ring-purple-500/50 shadow-lg" : "hover:shadow-lg"
                                }`}
                            >
                                <button onClick={() => toggleAccordion(index)} className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none">
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{faq.question}</span>
                                    <span className={`ml-4 text-purple-500 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}>
                                        {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
