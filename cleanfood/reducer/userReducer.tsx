import { createSlice } from '@reduxjs/toolkit'

const User = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: ({
        fetchUserInfo: (state, actions) => {},
        fetchUserInfoSuccess: (state, actions) => {
            state.user = actions.payload
        },
        updateUser: (state, actions) => {},
        updateUserSuccess: (state, actions) => {
            state.user = {...state.user, ...actions.payload}
        },
        uploadAvatar: (state, actions) => {},
        uploadAvatarSuccess: (state, actions) => {
            // debugger
        }
    })
})

export const UserActions = User.actions;

export const fetchUserInfo = (state) => state.User.fetchUserInfo;
export const updateUser = (state) => state.User.updateUser;

// export const addToCart = (state) => state.Auth.addToCart;

const UserReducer = User.reducer;
export default UserReducer;