
import { call, put, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { fetchAllGeneralMenu, GeneralMenuActions } from "../reducer/generalMenuReducer";
import { type Saga } from 'redux-saga';
import { ResponseFormatItem } from "../interface";
import { ProductActions } from "../reducer/ProductReducer";

function* fetchAllCombo(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.comboPackage.getAllComboPackage, param, 'general')
        if(response){
            yield put(ProductActions.fetchAllComboSuccess((response as ResponseFormatItem).data))
        }
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchProductByRoute(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.comboPackage.getByRoute, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}


export function* FollowFetchProduct():Generator {
    yield takeLatest(ProductActions.fetchAllCombo().type, fetchAllCombo)
    yield takeLatest(ProductActions.fetchProductByRoute().type, fetchProductByRoute)
}