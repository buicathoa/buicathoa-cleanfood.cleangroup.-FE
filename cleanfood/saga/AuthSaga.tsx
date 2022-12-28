
import { call, put, takeLatest } from "redux-saga/effects";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { fetchAllGeneralMenu, GeneralMenuActions } from "../reducer/generalMenuReducer";
import { type Saga } from 'redux-saga';
import { ResponseFormatItem } from "../interface";
import { CartActions } from "../reducer/cartReducer";
import { AuthActions } from "../reducer/authReducer";
import { AppActions } from "../reducer/appReducer";

// function* fetchAllGeneralMenus(action):Generator {
//     const { param, resolve, reject } = action.payload
//     try{
//         const response = yield apiRequest(apiUrl.generalMenus.getAll, param, 'general')
//         if(response){
//             yield put(GeneralMenuActions.fetchAllGeneralMenuSuccess((response as ResponseFormatItem).data))
//         }
//         if (resolve) yield resolve(response)
//     }
//     catch(err) {
//         if (reject) yield reject(err)
//     }
// }

function* fetchLogin(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.auth.login, param, 'general')
        yield put(AppActions.openLoading(false))
        if (resolve) yield resolve(response)
    }
    catch(err) {
        yield put(AppActions.openLoading(false))
        if (reject) yield reject(err)
    }
}
export function* FollowFetchAuth():Generator {
    // yield takeLatest(GeneralMenuActions.fetchAllGeneralMenu().type, fetchAllGeneralMenus)
    yield takeLatest(AuthActions.fetchLogin().type, fetchLogin)
}