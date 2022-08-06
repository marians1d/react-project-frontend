import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/Auth';
import * as authService from '../../services/auth';

export const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChange = (event) => {
        setEmail(event.target.value);
    };

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const loginHandler = (event) => {
        event.preventDefault();
        
        authService.login(email, password)
            .then(authData => {
                loginUser(authData);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                navigate('/404');
            });
    };

    return (
        <div>
            <form onSubmit={loginHandler}>
                <label htmlFor="email">Имейл</label>
                <input value={email} onChange={emailChange} id='email' type="text" />
                <label htmlFor="password">Парола</label>
                <input value={password} onChange={passwordChange} id='password' type="password" />

                <button>Влез</button>
            </form>
        </div>
    );
};