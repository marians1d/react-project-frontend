import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
    name: 'order',
    initialState: [],
    reducers: {
        addOrders: (state, action) => {
            state = action.payload.map(o => ({...o, comments: []}));
        },
        addOrder: (state, action) => {
            state = [...state, action.payload ];
        },
        addOrderDetails: (state, action) => {
            state = state.map(x => x._id === action.orderId ? action.payload : x);
        },
    }
});