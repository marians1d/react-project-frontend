import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addAll: (state, action) => {
            return action.payload.map(o => ({ ...o, comments: [] }));
        },
        addOne: (state, action) => {
            state.push(action.payload);
        },
        edit: (state, action) => {
            if (state.length === 0) {
                state.push(action.payload);
            } else {
                return state.map(x => x._id === action.payload._id ? action.payload : x);
            };
        },
        remove: (state, action) => {
            return state.filter(x => x._id !== action.payload._id);
        },
        addComment: (state, action) => {
            return state.map(x => x._id === action.payload.orderId
                ? { ...x, comments: [action.payload, ...x.comments] }
                : x
            );
        }
    }
});

export const { addAll, addOne, edit, addDetails, remove, addComment } = orderSlice.actions;

export default orderSlice.reducer;