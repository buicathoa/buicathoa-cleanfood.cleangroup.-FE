
import { all } from 'redux-saga/effects'
import { FollowFetchAuth } from './AuthSaga'
import { FollowFetchCart } from './CartSaga'
import { FollowFetchGeneralMenu } from './generalMenuSaga'
import { FollowFetchProduct } from './ProductSaga'

export default function* rootSaga(){
    yield all([
        FollowFetchGeneralMenu(),
        FollowFetchProduct(),
        FollowFetchCart(),
        FollowFetchAuth()
    ])
}