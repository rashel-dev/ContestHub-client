import React from "react";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { Users, Target, Zap, Award, Star } from "lucide-react";
import Particles from "../../Components/Animation/Particles";

const teamMembers = [
    { name: "Alex Johnson", role: "Founder & CEO" },
    { name: "Maria Garcia", role: "Lead Developer" },
    { name: "Sam Lee", role: "UI/UX Designer" },
    { name: "Jessica Brown", role: "Marketing Head" },
];

const features = [
    {
        icon: <Zap className="w-8 h-8 text-white" />,
        title: "Diverse Contests",
        description: "From coding challenges to design competitions, there's something for everyone.",
    },
    {
        icon: <Award className="w-8 h-8 text-white" />,
        title: "Win Amazing Prizes",
        description: "Compete for cash prizes, gadgets, and recognition for your skills.",
    },
    {
        icon: <Star className="w-8 h-8 text-white" />,
        title: "Community Focused",
        description: "Join a vibrant community of creators and innovators.",
    },
];

const AboutUs = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Particles particleColors={["#fe881b", "#ff6652", "#fe881b"]} particleCount={300} speed={0.1} particleBaseSize={50} />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
                <motion.div className="text-center mb-20" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, type: "spring" }}>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">About ContestHub</h1>
                    <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">Fueling Innovation and Creativity Through Friendly Competition.</p>
                </motion.div>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants}>
                        <Target className="w-16 h-16 text-primary mb-4" />
                        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Our mission is to provide a dynamic and engaging platform where individuals can showcase their talents, challenge themselves, and connect with a community of like-minded
                            peers. We believe that contests are a powerful tool for learning, growth, and innovation.
                        </p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="shrink-0 bg-linear-to-br from-primary to-accent p-3 rounded-full">{feature.icon}</div>
                                <div>
                                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <div className="text-center mb-20">
                    <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        We are a passionate team of developers, designers, and dreamers dedicated to building the best contest platform.
                    </p>
                </div>

                <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" animate="visible">
                    {teamMembers.map((member, index) => (
                        <motion.div key={index} variants={itemVariants} className="text-center p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 mx-auto mb-4 flex items-center justify-center">
                                <Users className="w-12 h-12 text-primary dark:text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-accent dark:text-accent">{member.role}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="text-center mt-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
                    <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">Explore exciting contests, showcase your skills, and win incredible prizes. Your next challenge awaits!</p>
                    <a
                        href="/contest"
                        className="inline-block bg-linear-to-r from-primary to-accent text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transform transition-transform duration-300"
                    >
                        Explore Contests
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;
