import { createSlice } from '@reduxjs/toolkit'

const order = createSlice({
    name: 'purchase',
    initialState: {
    },
    reducers: ({
        handlePurchase: (state, actions) => {},
    })
})

export const orderActions = order.actions;

const orderReducer = order.reducer;
export default orderReducer;