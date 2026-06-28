import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../app.jsx';
import Loading from '../components/loading/Loading.jsx';

const LoadingProtectedRoute = () => {
    const { authLoading } = useContext(AuthContext);

    if(authLoading) {
        <Loading />
    } 

    return <Outlet />;
};

export default LoadingProtectedRoute;