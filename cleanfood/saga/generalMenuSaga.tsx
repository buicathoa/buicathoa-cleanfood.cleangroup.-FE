
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { GeneralMenuActions } from "../reducer/generalMenuReducer";
import { ResponseFormatItem } from "../interface";
import { AnyAction } from "@reduxjs/toolkit";
import { openSuccess } from "../components/NotificationStatus";

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

function* createDaysRegister(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.generalMenus.createDaysRegister, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* getAllDaysRegister(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.generalMenus.getDaysRegister, param, 'general')
        yield put(GeneralMenuActions.getAllDaysRegisterSuccess((response as ResponseFormatItem).data))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* getOneDayRegister(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.generalMenus.getOneDayRegister, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* updateDaysRegister(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.generalMenus.updateDaysRegister, param, 'general')
        openSuccess('Cập nhật thông tin đơn hàng thành công!')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

export function* FollowFetchGeneralMenu():Generator {
    yield takeLatest(GeneralMenuActions.fetchAllGeneralMenu({}).type, fetchAllGeneralMenus)
    yield takeLatest(GeneralMenuActions.createGeneralMenus({}).type, createGeneralMenus)
    yield takeEvery(GeneralMenuActions.createDaysRegister({}).type, createDaysRegister)
    yield takeEvery(GeneralMenuActions.getAllDaysRegister({}).type, getAllDaysRegister)
    yield takeEvery(GeneralMenuActions.getOneDayRegister({}).type, getOneDayRegister)
    yield takeEvery(GeneralMenuActions.updateDaysRegister({}).type, updateDaysRegister)
}