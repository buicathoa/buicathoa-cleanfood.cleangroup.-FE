
import { call, put, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { fetchAllGeneralMenu, GeneralMenuActions } from "../reducer/generalMenuReducer";
import { type Saga } from 'redux-saga';
import { ResponseFormatItem } from "../interface";
import { CartActions } from "../reducer/cartReducer";
import { AppActions } from "../reducer/appReducer";

export function* FollowFetchCart():Generator {
    yield takeLatest(CartActions.fetchAllCart().type, fetchAllCart)
    yield takeLatest(CartActions.addToCart().type, addToCart)
    yield takeLatest(CartActions.updateCartByUser().type, updateCartByUser)
    yield takeLatest(CartActions.deleteCartItem().type, deleteCartItem)
}

function* fetchAllCart(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.cart.getCartByUser, param, 'general')
        if(response){
            yield put(CartActions.fetchAllCartSuccess((response as ResponseFormatItem).data))
        }
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* addToCart(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.cart.add, param, 'general')
        yield put(AppActions.stopLoading({}))
        yield put(CartActions.addToCartSuccess((response as ResponseFormatItem).data))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
        yield put(AppActions.stopLoading({}))
    }
}

function* updateCartByUser(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.cart.update, param, 'general')
        yield put(AppActions.stopLoading({}))
        yield put(CartActions.updateCartByUserSuccess((param as ResponseFormatItem)))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
        yield put(AppActions.stopLoading({}))
    }
}

function* deleteCartItem(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.cart.delete, param, 'general')
        yield put(AppActions.stopLoading({}))
        yield put(CartActions.updateCartByUserSuccess((response as ResponseFormatItem)))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
        yield put(AppActions.stopLoading({}))
    }
}
