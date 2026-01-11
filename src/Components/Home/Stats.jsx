import React from "react";
//eslint-disable-next-line
import { motion } from "framer-motion";
import CountUp from "react-countup";

const Stats = () => {
    const stats = [
        { label: "Active Contests", value: 150, suffix: "+" },
        { label: "Total Winners", value: 1200, suffix: "+" },
        { label: "Prize Pool", value: 50000, prefix: "$", suffix: "+" },
        { label: "Happy Users", value: 10, suffix: "k+" },
    ];

    return (
        <section className="py-20 bg-primary relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center text-white"
                        >
                            <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 flex items-center justify-center">
                                {stat.prefix && <span>{stat.prefix}</span>}
                                <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                                {stat.suffix && <span>{stat.suffix}</span>}
                            </div>
                            <div className="text-blue-100 text-lg md:text-xl font-medium opacity-80 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
