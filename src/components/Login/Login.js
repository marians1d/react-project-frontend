import { useState } from 'react';

import * as authService from '../../services/auth';

export const Login = () => {
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
                console.log(authData);
            })
            .catch((error) => {
                console.log(error);
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