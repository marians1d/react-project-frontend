import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
    name: 'error',
    initialState: null,
    reducers: {
        add: (state, action) => {
            return action.payload;
        },
        remove: (state) => {
            return null;
        }
    }
});

export const {add, remove}  = errorSlice.actions;

export default errorSlice.reducer;