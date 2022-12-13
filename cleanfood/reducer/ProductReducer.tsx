import { createSlice } from '@reduxjs/toolkit'

const Product = createSlice({
    name: 'product',
    initialState: {
        listCombo: []
    },
    reducers: ({
        fetchAllProducts: (state, actions) => {},
        fetchAllProductSuccess: (state, actions) => {
            state.listCombo = actions.payload
        },
        fetchProductByRoute:(state, actions) => {},
        fetchMoneyCost: (state, actions) => {
            
        }
    })
})

export const ProductActions = Product.actions;

export const fetchAllProduct = (state) => state.product.fetchAllProducts;
export const fetchAllGeneralMenuSuccess = (state) => state.product.fetchAllComboSuccess;

export const fetchProductByRoute = (state) => state.product.fetchProductByRoutes;

const ProductReducer = Product.reducer;
export default ProductReducer;