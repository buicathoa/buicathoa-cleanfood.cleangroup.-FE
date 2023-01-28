
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { type Saga } from 'redux-saga';
import { ResponseFormatItem } from "../interface";
import { CartActions } from "../reducer/cartReducer";
import { AppActions } from "../reducer/appReducer";
import { AnyAction } from "@reduxjs/toolkit";

export function* FollowFetchCart():Generator {
    yield takeLatest(CartActions.fetchAllCart({}).type, fetchAllCart)
    yield takeLatest(CartActions.addToCart({}).type, addToCart)
    yield takeEvery(CartActions.updateCartByUser({}).type, updateCartByUser)
    yield takeLatest(CartActions.deleteCartItem({}).type, deleteCartItem)
}

function* fetchAllCart(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.cart.getCartByUser, param, 'general')
        yield put(CartActions.fetchAllCartSuccess((response as ResponseFormatItem).data))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* addToCart(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.cart.add, param, 'general')
        yield put(AppActions.openLoading(false))
        yield put(CartActions.addToCartSuccess((response as ResponseFormatItem).data))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
        yield put(AppActions.openLoading(false))
    }
}

function* updateCartByUser(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.cart.update, param, 'general')
        yield put(CartActions.updateCartByUserSuccess((response as ResponseFormatItem).data))
        yield put(AppActions.openLoading(false))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
        yield put(AppActions.openLoading(false))
    }
}

function* deleteCartItem(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.cart.delete, param, 'general')
        yield put(AppActions.openLoading(false))
        yield put(CartActions.deleteCartItemSuccess((param as ResponseFormatItem)))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
        yield put(AppActions.openLoading(false))
    }
}
