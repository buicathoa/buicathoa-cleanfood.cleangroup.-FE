
import { call, put, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { fetchAllGeneralMenu, GeneralMenuActions } from "../reducer/generalMenuReducer";
import { type Saga } from 'redux-saga';
import { ResponseFormatItem } from "../interface";
import { AnyAction } from "@reduxjs/toolkit";

function* fetchAllGeneralMenus(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.generalMenus.getAll, param, 'general')
        if(response){
            yield put(GeneralMenuActions.fetchAllGeneralMenuSuccess((response as ResponseFormatItem).data))
        }
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* createGeneralMenus(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.generalMenus.getAll, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}
export function* FollowFetchGeneralMenu():Generator {
    yield takeLatest(GeneralMenuActions.fetchAllGeneralMenu({}).type, fetchAllGeneralMenus)
    yield takeLatest(GeneralMenuActions.createGeneralMenus({}).type, createGeneralMenus)
}