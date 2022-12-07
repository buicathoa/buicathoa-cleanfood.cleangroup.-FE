
import { all } from 'redux-saga/effects'
import { FollowFetchGeneralMenu } from './generalMenuSaga'
import { FollowFetchProduct } from './ProductSaga'

export default function* rootSaga(){
    yield all([
        FollowFetchGeneralMenu(),
        FollowFetchProduct()
    ])
}