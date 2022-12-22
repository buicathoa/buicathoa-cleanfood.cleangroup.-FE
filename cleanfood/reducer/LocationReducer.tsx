import { createSlice } from '@reduxjs/toolkit'

const location = createSlice({
    name: 'location',
    initialState: {
        listCity: [],
        listDistrict: [],
        listWard: []
    },
    reducers: ({
        fetchListCity: (state, actions) => {},
        fetchListCitySuccess: (state, actions) => {
            state.listCity = actions.payload
        },
        fetchListDistrict: (state, actions) => {},
        fetchListDistrictSuccess: (state, actions) => {
            state.listDistrict = actions.payload
        },
        fetchListWard: (state, actions) => {},
        fetchListWardSuccess: (state, actions) => {
            state.listWard = actions.payload
        },
        createGeneralMenus: (state, actions) => {}
    })
})

export const LocationActions = location.actions;

export const fetchListCity = (state) => state.location.fetchListCity;
export const fetchListDistrict = (state) => state.location.fetchListDistrict;
export const fetchListWard = (state) => state.location.fetchListWard;

export const createGeneralMenus = (state) => state.location.createGeneralMenus;

const LocationReducer = location.reducer;
export default LocationReducer;