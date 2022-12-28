import { createSlice } from '@reduxjs/toolkit'
import { UserReducer } from '../interface'
import { genLocation } from '../utils/helper'

const initialState: UserReducer = {
    user: {},
    listDeliveryAddress: []
}

const User = createSlice({
    name: 'user',
    initialState,
    reducers: ({
        fetchUserInfo: (state, actions) => { },
        fetchUserInfoSuccess: (state, actions) => {
            state.user = actions.payload
        },
        updateUser: (state, actions) => { },
        updateUserSuccess: (state, actions) => {
            state.user = { ...state.user, ...actions.payload }
        },
        uploadAvatar: (state, actions) => { },
        uploadAvatarSuccess: (state, actions) => { },
        
        getAllDeliveryAddress: (state, actions) => { },
        getAllDeliveryAddressSuccess: (state, actions) => {
            state.listDeliveryAddress = actions.payload
        },
        createDeliveryAddress: (state, actions) => { },
        createDeliveryAddressSuccess: (state, actions) => {
            // state.listDeliveryAddress.push(actions.payload)
        },
        updateDefaultDeliveryAddress: (state, actions) => { },
        updateDefaultDeliveryAddressSuccess: (state, actions) => {
        }
    })
})

export const UserActions = User.actions;

export const fetchUserInfo = (state) => state.User.fetchUserInfo;
export const updateUser = (state) => state.User.updateUser;

// export const addToCart = (state) => state.Auth.addToCart;

const UserReducer = User.reducer;
export default UserReducer;