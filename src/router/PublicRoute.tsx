import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';

const PublicRoute = (isAuth: boolean) => {
    return !isAuth ? <LoginScreen /> : <Navigate to="/" />;
};

export default PublicRoute;
