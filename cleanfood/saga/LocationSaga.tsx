
import { call, put, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { fetchAllGeneralMenu, GeneralMenuActions } from "../reducer/generalMenuReducer";
import { type Saga } from 'redux-saga';
import { ResponseFormatItem } from "../interface";
import { LocationActions } from "../reducer/LocationReducer";
import { AnyAction } from "@reduxjs/toolkit";

function* fetchListCity(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.location.getAllCity, param, 'general')
        if(response){
            yield put(LocationActions.fetchListCitySuccess((response as ResponseFormatItem).data))
        }
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchListDistrict(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.location.getDistrictByCity, param, 'general')
        if(response){
            yield put(LocationActions.fetchListDistrictSuccess((response as ResponseFormatItem).data))
        }
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchListWard(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.location.getWardByDistrict, param, 'general')
        if(response){
            yield put(LocationActions.fetchListWardSuccess((response as ResponseFormatItem).data))
        }
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

export function* FollowFetchLocation():Generator {
    yield takeLatest(LocationActions.fetchListCity({}).type, fetchListCity)
    yield takeLatest(LocationActions.fetchListDistrict({}).type, fetchListDistrict)
    yield takeLatest(LocationActions.fetchListWard({}).type, fetchListWard)
}