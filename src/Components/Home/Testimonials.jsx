import React from "react";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Graphic Designer",
            content: "ContestHub changed my career! I won my first major design contest here and it opened so many doors for me. The platform is incredibly intuitive.",
            avatar: "https://i.pravatar.cc/150?u=sarah",
            rating: 5,
        },
        {
            name: "Michael Chen",
            role: "Full Stack Developer",
            content: "The coding challenges are top-notch. I love the competitive atmosphere and the community support. Highly recommended for anyone looking to level up.",
            avatar: "https://i.pravatar.cc/150?u=michael",
            rating: 5,
        },
        {
            name: "Emma Wilson",
            role: "Content Creator",
            content: "I've participated in several writing contests. The feedback from judges is always constructive and the prize distribution is very fast.",
            avatar: "https://i.pravatar.cc/150?u=emma",
            rating: 4,
        },
    ];

    return (
        <section className="py-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                        What Our <span className="text-primary">Users Say</span>
                    </motion.h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Hear from our successful participants who have transformed their skills into achievements.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl relative border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                                <FaQuoteLeft />
                            </div>

                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} />
                                ))}
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed">"{testimonial.content}"</p>

                            <div className="flex items-center">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full border-2 border-primary p-0.5 mr-4" />
                                <div>
                                    <h4 className="font-bold text-lg dark:text-white">{testimonial.name}</h4>
                                    <p className="text-primary text-sm font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
