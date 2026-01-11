import React from "react";
// eslint-disable-next-line
import { motion } from "framer-motion";

const Partners = () => {
    const partners = [
        { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
        { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
        { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
        { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/30 border-y border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest text-sm">Trusted by Industry Leaders</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner, index) => (
                        <motion.img
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            src={partner.logo}
                            alt={partner.name}
                            className="h-8 md:h-10 w-auto object-contain dark:invert"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
