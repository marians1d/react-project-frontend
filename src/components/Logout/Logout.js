import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../features/auth/authSlice';
import * as authService from '../../services/auth';

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        authService.logout()
            .then(() => {
                dispatch(logout());
                navigate('/', { replace: true });
            })
            .catch(() => {
                navigate('/', { replace: true });
            });
    });

    return null;
};