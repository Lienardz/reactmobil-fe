import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderListReducer,
  orderDeleteReducer,
  orderDeliverAndPaidReducer,
  orderSummaryReducer,
  
} from './reducers/orderReducers';
import {
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  productDeleteReducer,
  productReviewCreateReducer,
  productCreateReducer,
  productCategoryListReducer,
  
} from './reducers/productReducers';
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  // userListReducer,
  // userDeleteReducer,
  // userUpdateReducer,
} from './reducers/userReducers';
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
      shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  productDelete: productDeleteReducer,
  orderDelete: orderDeleteReducer,
  orderDeliverAndPaid: orderDeliverAndPaidReducer,
  productCategoryList: productCategoryListReducer,
  orderSummary: orderSummaryReducer,
  // userList: userListReducer,
  // userDelete: userDeleteReducer,
  // userUpdate: userUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productCreate: productCreateReducer,
  
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;