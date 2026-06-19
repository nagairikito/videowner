import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../app.jsx';

const LoadingProtectedRoute = () => {
    const { authLoading } = useContext(AuthContext);

    if(authLoading) {
        return(
            <div>Loading...</div>
        );
    } 

    return <Outlet />;
};

export default LoadingProtectedRoute;