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

export const fetchLogin = (state) => state.Auth.fetchLogin;
// export const addToCart = (state) => state.Auth.addToCart;

const AuthReducer = Auth.reducer;
export default AuthReducer;