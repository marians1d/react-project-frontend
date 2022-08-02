import { useState } from 'react';

export const Login = () => {


    return (
        <div>
            <form>
                <label htmlFor="username">Потребителско Име</label>
                <input id='username' type="text" />
                <label htmlFor="password">Парола</label>
                <input id='password' type="password" />

                <button>Влез</button>
            </form>
        </div>
    );
};