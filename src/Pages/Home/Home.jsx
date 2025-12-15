import React from "react";
import Banner from "../../Components/Home/Banner";
import PopularContest from "../../Components/Home/PopularContest";
import WinnerSection from "../../Components/Home/WinnerSection";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContest></PopularContest>
            <WinnerSection></WinnerSection>
        </div>
    );
};

export default Home;
