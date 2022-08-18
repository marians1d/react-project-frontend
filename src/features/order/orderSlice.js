import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    isLoading: true,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addAll: (state, action) => {
            state.orders = action.payload.map(o => ({ ...o, comments: [] }));
        },
        addOne: (state, action) => {
            state.orders.push(action.payload);
        },
        edit: (state, action) => {
            state.orders = state.orders.map(x => x._id === action.payload._id ? action.payload : x);
        },
        remove: (state, action) => {
            state.orders = state.orders.filter(x => x._id !== action.payload._id);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        addComment: (state, action) => {
            state.orders = state.map(x => x._id === action.payload.orderId
                ? { ...x, comments: [...x.comments, action.payload.comment] }
                : x
            );
        }
    }
});

export const { addAll, addOne, edit, addDetails, remove, setLoading } = orderSlice.actions;

export default orderSlice.reducer;