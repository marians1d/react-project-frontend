import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {},
    reducers: {
        login: (state, action) => {
            localStorage.setItem('auth', JSON.stringify({...action.payload, isLogged: !!action.payload._id}));

            return {...action.payload, isLogged: !!action.payload._id};
        },
        logout: (state) => {
            localStorage.setItem('auth', JSON.stringify({}));

            return {};
        }
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
