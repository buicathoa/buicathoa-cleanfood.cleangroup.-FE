
import { call, put, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { fetchAllGeneralMenu, GeneralMenuActions } from "../reducer/generalMenuReducer";
import { type Saga } from 'redux-saga';
import { ResponseFormatItem } from "../interface";
import { CartActions } from "../reducer/cartReducer";
import { AuthActions } from "../reducer/authReducer";
import { AppActions } from "../reducer/appReducer";
import { UserActions } from "../reducer/userReducer";


function* fetchUserInfo(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.user.getUserInfo, param, 'general')
        yield put(AppActions.stopLoading({}))
        yield put(UserActions.fetchUserInfoSuccess((response as ResponseFormatItem).data))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.stopLoading({}))
        if (reject) yield reject(err)
    }
}

function* updateUser(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.user.update, param, 'general')
        yield put(UserActions.updateUserSuccess((param as ResponseFormatItem)))
        yield put(AppActions.stopLoading({}))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.stopLoading({}))
        if (reject) yield reject(err)
    }
}

function* uploadAvatar(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.user.uploadAvatar, param, 'formdata')
        yield put(AppActions.stopLoading({}))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.stopLoading({}))
        if (reject) yield reject(err)
    }
}
export function* FollowFetchUser():Generator {
    yield takeLatest(UserActions.fetchUserInfo().type, fetchUserInfo)
    yield takeLatest(UserActions.updateUser().type, updateUser)
    yield takeLatest(UserActions.uploadAvatar().type, uploadAvatar)
}