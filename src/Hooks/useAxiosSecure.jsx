import axios from "axios";
import React from "react";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: "https://contest-hub-server-two.vercel.app",
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        //intercept request
        const reqInterceptor =  axiosSecure.interceptors.request.use((config) => {
            config.headers.authorization = `Bearer ${user?.accessToken}`;
            return config;
        });

        //interceptor response
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error);

            const statusCode = error.response.status;
            if (statusCode === 401 || statusCode === 403) {
                logOut()
                .then(() => {
                    navigate('/login');
                })
            }

            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }


    }, [user, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;
