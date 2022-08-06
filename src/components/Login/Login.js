import { useState } from 'react';



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
        

    };

    return (
        <div>
            <form onSubmit={loginHandler}>
                <h2>{email}</h2>
                <label htmlFor="email">Имейл</label>
                <input value={email} onChange={emailChange} id='email' type="text" />
                <label htmlFor="password">Парола</label>
                <input value={password} onChange={passwordChange} id='password' type="password" />

                <button>Влез</button>
            </form>
        </div>
    );
};