import React from "react";
import Banner from "../../Components/Home/Banner";
import PopularContest from "../../Components/Home/PopularContest";
import WinnerSection from "../../Components/Home/WinnerSection";
import FAQ from "../../Components/Home/FAQ";
import HowItWorks from "../../Components/Home/HowItWorks";
import Stats from "../../Components/Home/Stats";
import Testimonials from "../../Components/Home/Testimonials";
import Newsletter from "../../Components/Home/Newsletter";
import Partners from "../../Components/Home/Partners";

const Home = () => {
    return (
        <div className="overflow-hidden">
            <Banner />
            <Partners />
            <PopularContest />
            <HowItWorks />
            <Stats />
            <WinnerSection />
            <Testimonials />
            <FAQ />
            <Newsletter />
        </div>
    );
};

export default Home;
