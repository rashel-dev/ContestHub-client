import React from 'react';
import useAuth from '../Hooks/useAuth';
import GridLoader from '../Components/Loader/GridLoader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <GridLoader></GridLoader>
    }

    if(!user){
        return <Navigate to="/login" state={location.pathname} replace></Navigate>;
    }

    return children;
};

export default PrivateRoute;