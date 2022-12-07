import { createSlice } from '@reduxjs/toolkit'

const Product = createSlice({
    name: 'product',
    initialState: {
        listCombo: []
    },
    reducers: ({
        fetchAllCombo: (state, actions) => {},
        fetchAllComboSuccess: (state, actions) => {
            state.listCombo = actions.payload
        }
    })
})

export const ProductActions = Product.actions;

export const fetchAllGeneralMenu = (state) => state.product.fetchAllCombo;
export const fetchAllGeneralMenuSuccess = (state) => state.product.fetchAllComboSuccess;

const ProductReducer = Product.reducer;
export default ProductReducer;