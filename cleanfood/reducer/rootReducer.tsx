import createSagaMiddleware from "@redux-saga/core";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createRouterMiddleware, routerReducer } from "connected-next-router";
import rootSaga from "../saga/rootSaga";
// import rootSaga from "../sagas/rootSaga";
// import NotifyReducer from "reducer/NotifySlice";
// import AddressReducer from "../reducer/AddressSlice";
// import CategoryReducer from "../reducer/CategorySlice";
// import dangKyReducer from "../reducer/DangKySlice";
// import detailProductReducer from "../reducer/DetailProduct";
// import ListCateProductReducer from "../reducer/ListCateProductSlice";
// import ListGroupReducer from "../reducer/ListGroupSlice";
// import ListNccReducer from "../reducer/ListNccSlice";
// import listProductNccReducer from "../reducer/ListProductNcc";
// import listProductReducer from "../reducer/ListProductSlice";
// import ListReducer from "../reducer/ListSlice";
// import loadingReducer from "../reducer/LoadingSlice";
// import loginReducer from "../reducer/LoginSlice";
// import manageCustomerReducer from "../reducer/ManageCustomerSlice";
// import productFavouriteReducer from "../reducer/ProductFavouriteSlice";
// import searchOrderReducer from "../reducer/SearchOrderSlice";
// import ShoppingReducer from "../reducer/ShoppingSlice";
// import GrouponReducer from "../reducer/MuaChungSlice";
// import rootSaga from "./rootSaga";

const rootReducer = combineReducers({
    router: routerReducer
})

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware()
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(sagaMiddleware, routerMiddleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);

export default store;