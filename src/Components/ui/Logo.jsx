import React from 'react';
import logo from "../../assets/logo.PNG"

const Logo = () => {
    return (
        <div className="flex items-center gap-2 ">
            <img className="w-6 sm:w-10" src={logo} alt="contest hub log" />
            <h1 className="text-xl sm:text-2xl font-bold dark:text-secondary">
                Contest<span className='text-primary'>Hub</span>
            </h1>
        </div>
    );
};

export default Logo;