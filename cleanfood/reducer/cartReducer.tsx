import { createSlice } from '@reduxjs/toolkit'

const Cart = createSlice({
    name: 'cart',
    initialState: {
        listCart: {},
        listCartQuantity: 0
    },
    reducers: ({
        fetchAllCart: (state, actions) => { },
        fetchAllCartSuccess: (state, actions) => {
            state.listCart = actions?.payload
            state.listCartQuantity = actions?.payload?.total_quantity
        },
        addToCart: (state, actions) => { },
        addToCartSuccess: (state, actions) => {
        },
        updateCartByUser: (state, actions) => { },
        updateCartByUserSuccess: (state, actions) => {
            let listCart = []
            let totalPrice = 0
            let totalQuantity = 0
            if (actions?.payload?.quantity) {
                listCart = [
                    ...(state?.listCart as any)?.list_carts.map((item: any) => {
                        if (item.cart_id === actions?.payload?.cart_id) {
                            item = { ...item, quantity: actions?.payload?.quantity, total_price: actions?.payload?.quantity * item.price }
                            return item
                        } else {
                            return item
                        }
                    })
                ]
            } else {
                listCart = [
                    ...(state?.listCart as any)?.list_carts.map((item: any) => {
                        if (item.cart_id === actions?.payload?.cart_id) {
                            item = { ...item, quantity: item.quantity + actions?.payload?.inc_quantity, total_price: (item.quantity + actions?.payload?.inc_quantity) * item.price }
                            return item
                        } else {
                            return item
                        }
                    })
                ]
            }
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
            const listCart = [...state.listCart.list_carts].filter(item => item.cart_id !== actions?.payload?.param?.cart_id)
            const totalPrice = listCart
                ?.map((item) => {
                    return item?.total_price
                })
                ?.reduce((prev, curr) => prev + curr, 0)
            const totalQuantity = listCart
                ?.map((item) => {
                    return item.quantity
                })
                ?.reduce((prev, curr) => prev + curr, 0)
            state.listCart = { list_carts: listCart, total_price: totalPrice || 0, total_quantity: totalQuantity || 0 }
        }
    })
})

export const CartActions = Cart.actions;

export const listCart = (state) => state.Cart.listCart;
export const fetchAllCartSuccess = (state) => state.Cart.fetchAllCartSuccess;
export const addToCart = (state) => state.Cart.addToCart;

const CartReducer = Cart.reducer;
export default CartReducer;