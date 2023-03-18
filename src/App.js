import React, { useEffect } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import SellerRoute from './components/SellerRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import SellerScreen from './screens/SellerScreen';
import Sellers from './screens/Sellers';
import UserScreen from './screens/UserScreen';
import MessengerScreen from './screens/MessengerScreen';
import UserMessenger from './screens/UserMessenger';
// import ChatBox from './components/ChatBox';
// import MessengerAppScreen from './screens/MessengerAppScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
            <Link className="brand" to="/">
              Mobils
            </Link>
        </div>
        <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
        <div>
        {userInfo ? (
              <div className="dropdown">
                
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Keluar
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Masuk</Link>
            )}
              <Link to="/cart">
              Keranjang
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
              </Link>
              {userInfo && !userInfo.isSeller && (
                <div className='dropdown'>
                  <Link to="#user">
                    User <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className='dropdown-content'>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to={`/user/${userInfo._id}`}>
                      Profil
                    </Link>
                  </li>
                  <li>
                    <Link to="/usermessenger">Messenger</Link>
                  </li>
                  </ul>
                </div>
              )}
              {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#seller">
                  Penjual <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to={`/sellers/${userInfo._id}`}>
                      Profil
                    </Link>
                  </li>
                  <li>
                    <Link to="/productlist/seller">Produk</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Order</Link>
                  </li>
                  <li>
                    <Link to="/messenger">Messenger</Link>
                  </li>
                </ul>
              </div>
            )}
        </div>
        </header>
        <main>
        <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/user/:id" component={UserScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/usermessenger" component={UserMessenger}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/order/:order"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
            exact
            ></SellerRoute>
            <SellerRoute path="/sellers/:id" component={Sellers}></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
            exact
            ></SellerRoute>
          <SellerRoute path="/messenger" component={MessengerScreen} exact></SellerRoute>
        </main>
        {/* <footer className="row center">
          {userInfo && !userInfo.isSeller && <ChatBox userInfo={userInfo} />}
        </footer> */}
      </div>
    </BrowserRouter>
  );
}

export default App;