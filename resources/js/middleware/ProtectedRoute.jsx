import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../app.jsx';

const ProtectedRoute = () => {
    const { loginUserRes } = useContext(AuthContext);

    if (!loginUserRes) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;