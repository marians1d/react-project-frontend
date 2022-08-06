import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/Auth';
import * as authService from '../../services/auth';

export const Logout = () => {
    const { logoutUser } = useContext(AuthContext);

    useEffect(() => {
        authService.logout()
            .then(() => {
                logoutUser();
                return <Navigate to={'/'} replace />;
            })
            .catch(() => {
                return <Navigate to={'/'} replace />;
            });
    });

    return null;
};