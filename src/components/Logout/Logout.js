import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/Auth';
import * as authService from '../../services/auth';

export const Logout = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuthContext();

    useEffect(() => {
        authService.logout()
            .then(() => {
                logoutUser();
                navigate('/', { replace: true });
            })
            .catch(() => {
                navigate('/', { replace: true });
            });
    });

    return null;
};