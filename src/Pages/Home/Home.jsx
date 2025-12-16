import React from "react";
import Banner from "../../Components/Home/Banner";
import PopularContest from "../../Components/Home/PopularContest";
import WinnerSection from "../../Components/Home/WinnerSection";
import FAQ from "../../Components/Home/FAQ";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContest></PopularContest>
            <WinnerSection></WinnerSection>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;
