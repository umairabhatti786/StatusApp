import {combineReducers} from 'redux';
import authReducer from './authReducer';
import locationReducer from './locationReducer';
import branchesReducer from './branchesReducer';
import homePageReducer from './homePageReducer';
import manuePageReducer from './manuePageReducer';
import productDetailReducer from './productDetailReducer';
import cartReducer from './cartReducer';
import paymentReducer from './paymentReducer';
import orderHistoryReducer from './orderHistoryReducer';
import localizeReducer from './localizeReducer';
import orderDetailsReducer from './orderDetailsReducer';
import membershipReducer from './membershipReducer';


const rootReducer=combineReducers({

    auth:authReducer,
    homePage:homePageReducer,
    cart:cartReducer,
    manuePage:manuePageReducer,
    productDetail:productDetailReducer,
    paymentMethod:paymentReducer,
    orderHistory:orderHistoryReducer,
    orderDetail:orderDetailsReducer,
    location:locationReducer,
    branches:branchesReducer,
    localize:localizeReducer,
    memberships:membershipReducer


})

export default rootReducer