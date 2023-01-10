import { createSlice } from '@reduxjs/toolkit'

const generalMenu = createSlice({
    name: 'generalMenu',
    initialState: {
        listMenu: [],
        daysRegister: []
    },
    reducers: ({
        fetchAllGeneralMenu: (state, actions) => {},
        fetchAllGeneralMenuSuccess: (state, actions) => {
            state.listMenu = actions.payload
        },
        createGeneralMenus: (state, actions) => {},
        createDaysRegister: (state, actions) => {},
        getAllDaysRegister: (state, actions) => {},
        getAllDaysRegisterSuccess: (state, actions) => {
            state.daysRegister = actions.payload
        },
        getOneDayRegister: (state, actions) => {},
        updateDaysRegister: (state, actions) => {},
        updateDaysRegisterSuccess: (state, actions) => {}
    })
})

export const GeneralMenuActions = generalMenu.actions;

const GeneralMenuReducer = generalMenu.reducer;
export default GeneralMenuReducer;