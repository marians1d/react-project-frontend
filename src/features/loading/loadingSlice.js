import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        orders: false,
        user: false,
        comments: false,
    },
    reducers: {
        toggleLoading: (state, action) => {
            state[action.payload] = !state[action.payload];
        },
        onLoading: (state, action) => {
            state[action.payload] = true;
        },
        offLoading: (state, action) => {
            state[action.payload] = false;
        }
    }
});

export const { toggleLoading, offLoading, onLoading } = loadingSlice.actions;

export default loadingSlice.reducer;