import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { Link } from 'react-router-dom';
// import ChatBox from '../components/ChatBox';


export default function SellerScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, } = userDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <h1>Nama: {user.name}</h1>
                </div>
              </div>
            </li>
            <li>
              Status: Penjual
            </li>
            <li>
              Kontak: {user.contact}
            </li>
            {/* <li>
                <Link to="/profile">Ubah Profil</Link>
            </li> */}
           
            {/* <li>
              <Link to="/dashboard">Dashboard</Link>
            </li> */}
            <li>
            {/* {userInfo && !userInfo.isSeller && <ChatBox userInfo={userInfo} />} */}
            </li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}