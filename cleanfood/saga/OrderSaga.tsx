
import { call, put, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { AnyAction } from "@reduxjs/toolkit";
import { orderActions } from "../reducer/orderReducer";

function* handlePurchase(action:AnyAction):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.order.purchase, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

export function* FollowFetchOrder():Generator {
    yield takeLatest(orderActions.handlePurchase({}).type, handlePurchase)
}