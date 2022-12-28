
import { all, call, put, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { fetchAllGeneralMenu, GeneralMenuActions } from "../reducer/generalMenuReducer";
import { type Saga } from 'redux-saga';
import { ResponseFormatItem } from "../interface";
import { CartActions } from "../reducer/cartReducer";
import { AuthActions } from "../reducer/authReducer";
import { AppActions } from "../reducer/appReducer";
import { UserActions } from "../reducer/userReducer";
import { openSuccess } from "../components/NotificationStatus";


function* fetchUserInfo(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        yield put(AppActions.openLoading(true))
        const response = yield apiRequest(apiUrl.user.getUserInfo, param, 'general')
        if(response){
            yield put(AppActions.openLoading(false))
            yield put(UserActions.fetchUserInfoSuccess((response as ResponseFormatItem).data))
            // yield put(AppActions.openLoading(false))
        }
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.openLoading(false))
        if (reject) yield reject(err)
    }
}

function* updateUser(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.user.update, param, 'general')
        yield put(UserActions.updateUserSuccess((param as ResponseFormatItem)))
        yield put(AppActions.openLoading(false))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.openLoading(false))
        if (reject) yield reject(err)
    }
}

function* uploadAvatar(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.user.uploadAvatar, param, 'formdata')
        yield put(AppActions.openLoading(false))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.openLoading(false))
        if (reject) yield reject(err)
    }
}

function* getAllDeliveryAddress(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response:any = yield apiRequest(apiUrl.user.delivery.getAll, param, 'general')
        yield put(AppActions.openLoading(false))
        yield put(UserActions.getAllDeliveryAddressSuccess((response.data)  as ResponseFormatItem))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.openLoading(false))
        if (reject) yield reject(err)
    }
}

function* createDeliveryAddress(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.user.delivery.create, param, 'general')
        yield put(AppActions.openLoading(false))
        yield put(UserActions.createDeliveryAddressSuccess((response as ResponseFormatItem).data))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.openLoading(false))
        if (reject) yield reject(err)
    }
}

function* updateDefaultDeliveryAddress(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response:any = yield apiRequest(apiUrl.user.delivery.update, param, 'general')
        yield put(AppActions.openLoading(false))
        openSuccess('Cập nhật thông tin giao hàng thành công!')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.openLoading(false))
        if (reject) yield reject(err)
    }
}


export function* FollowFetchUser():Generator {
    yield all([
        yield takeLatest(UserActions.fetchUserInfo().type, fetchUserInfo),
        yield takeLatest(UserActions.updateUser().type, updateUser),
        yield takeLatest(UserActions.uploadAvatar().type, uploadAvatar),

        yield takeLatest(UserActions.getAllDeliveryAddress().type, getAllDeliveryAddress),
        yield takeLatest(UserActions.createDeliveryAddress().type, createDeliveryAddress),
        yield takeLatest(UserActions.updateDefaultDeliveryAddress().type, updateDefaultDeliveryAddress)
    ])
}