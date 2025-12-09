import React from 'react';
import useAuth from '../Hooks/useAuth';
import GridLoader from '../Components/Loader/GridLoader';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();

    if(loading){
        return <GridLoader></GridLoader>
    }

    if(!user){
        return <Navigate to="/login" ></Navigate>
    }

    return children;
};

export default PrivateRoute;