import { createSlice } from '@reduxjs/toolkit'
import { CartReducerInterface } from '../interface'

const initialState: CartReducerInterface = {
    listCart: {list_carts: [], total_price: 0, total_quantity: 0},
    listCartQuantity: 0,
    updateCart: false
}

const Cart = createSlice({
    name: 'cart',
    initialState,
    reducers: ({
        fetchAllCart: (state, actions) => { },
        fetchAllCartSuccess: (state, actions) => {
            state.listCart = actions?.payload
            state.listCartQuantity = actions?.payload?.total_quantity
        },
        addToCart: (state, actions) => { },
        addToCartSuccess: (state, actions) => {
            state.updateCart = !state.updateCart
        },
        updateCartByUser: (state, actions) => { },
        updateCartByUserSuccess: (state, actions) => {
            let listCart = []
            let totalPrice = 0
            let totalQuantity = 0
            listCart = [
                ...(state?.listCart as any)?.list_carts.map((item: any) => {
                    if (item._id === actions?.payload?._id) {
                        item = { ...item, ...actions.payload , total_price: actions?.payload?.quantity * item.price }
                        return item
                    } else {
                        return item
                    }
                })
            ]
            // debugger
            totalPrice = listCart
                ?.map((item) => {
                    return item?.total_price
                })
                ?.reduce((prev, curr) => prev + curr, 0)
            totalQuantity = listCart
                ?.map((item) => {
                    return item.quantity
                })
                ?.reduce((prev, curr) => prev + curr, 0)
            state.listCart = { list_carts: listCart, total_price: totalPrice || 0, total_quantity: totalQuantity || 0 }
        },
        deleteCartItem: (state, actions) => {

        },
        deleteCartItemSuccess: (state, actions) => {
            const listCart = [...state.listCart.list_carts!].filter(item => item._id !== actions?.payload?.cart_id)
            const totalPrice = listCart
                ?.map((item) => {
                    return item?.total_price
                })
                ?.reduce((prev, curr) => prev! + curr!, 0)
            const totalQuantity = listCart
                ?.map((item) => {
                    return item.quantity
                })
                ?.reduce((prev, curr) => prev! + curr!, 0)
            state.listCart = { list_carts: listCart, total_price: totalPrice, total_quantity: totalQuantity}
        }
    })
})

export const CartActions = Cart.actions;

const CartReducer = Cart.reducer;
export default CartReducer;