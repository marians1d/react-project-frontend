import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {},
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem('auth', JSON.stringify(action.payload));

            state.value = action.payload;
        },
        logout: (state) => {
            localStorage.setItem('auth', JSON.stringify({}));

            state.value = {};
        }
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
