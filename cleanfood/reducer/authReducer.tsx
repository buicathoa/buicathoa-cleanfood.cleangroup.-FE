import { createSlice } from '@reduxjs/toolkit'

const Auth = createSlice({
    name: 'auth',
    initialState: {
        Cart: [] 
    },
    reducers: ({
        fetchLogin: (state, actions) => {},
        // addToCart: (state, actions) => {}
    })
})

export const AuthActions = Auth.actions;

const AuthReducer = Auth.reducer;
export default AuthReducer;