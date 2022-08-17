import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {},
    reducers: {
        login: (state, action) => {
            localStorage.setItem('auth', JSON.stringify(action.payload));

            return action.payload;
        },
        logout: (state) => {
            localStorage.setItem('auth', JSON.stringify({}));

            return {};
        }
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
