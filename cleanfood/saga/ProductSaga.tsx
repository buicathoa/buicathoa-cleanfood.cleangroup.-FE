
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { fetchAllGeneralMenu, GeneralMenuActions } from "../reducer/generalMenuReducer";
import { type Saga } from 'redux-saga';
import { ResponseFormatItem } from "../interface";
import { ProductActions } from "../reducer/ProductReducer";

function* fetchAllProducts(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.product.getAll, param, 'general')
        if(response){
            yield put(ProductActions.fetchAllProductSuccess((response as ResponseFormatItem).data))
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
        const response = yield apiRequest(apiUrl.product.getByRoute, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchMoneyCost(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.product.getMoneyCost, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}


export function* FollowFetchProduct():Generator {
    yield takeEvery(ProductActions.fetchAllProducts().type, fetchAllProducts)
    yield takeLatest(ProductActions.fetchProductByRoute().type, fetchProductByRoute)
    yield takeLatest(ProductActions.fetchMoneyCost().type, fetchMoneyCost)
}