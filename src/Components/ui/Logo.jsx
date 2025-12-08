import React from 'react';
import logo from "../../assets/logo.PNG"

const Logo = () => {
    return (
        <div className='flex items-center gap-2'>
            <img className='w-10' src={logo} alt="contest hub log" />
            <h1 className='text-2xl font-bold'>Contest Hub</h1>
        </div>
    );
};

export default Logo;