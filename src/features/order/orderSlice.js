import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
    name: 'order',
    initialState: [],
    reducers: {
        addAll: (state, action) => {
            state = action.payload.map(o => ({...o, comments: []}));
        },
        addOne: (state, action) => {
            state = [...state, action.payload ];
        },
        addDetails: (state, action) => {
            state = state.map(x => x._id === action.orderId ? action.payload : x);
        },
        remove: (state, action) => {
            
        }
    }
});