import { createSlice } from '@reduxjs/toolkit'

const generalMenu = createSlice({
    name: 'post',
    initialState: {
        listCombo: []
    },
    reducers: ({
        fetchAllGeneralMenu: (state, actions) => {},
        createGeneralMenus: (state, actions) => {}
    })
})

export const GeneralMenuActions = generalMenu.actions;

export const fetchAllGeneralMenu = (state) => state.generalMenu.fetchAllGeneralMenu;
export const createGeneralMenus = (state) => state.generalMenu.createGeneralMenus;

const GeneralMenuReducer = generalMenu.reducer;
export default GeneralMenuReducer;