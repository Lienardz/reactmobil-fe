import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverAndPaidOrder, detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVERANDPAID_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const { order, loading, error } = orderDetails;
  const orderDeliverAndPaid = useSelector((state) => state.orderDeliverAndPaid);
  const {
    loading: loadingDeliverAndPaid,
    error: errorDeliverAndPaid,
    success: successDeliverAndPaid,
  } = orderDeliverAndPaid;
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !order ||
      successDeliverAndPaid ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_DELIVERANDPAID_RESET });
      dispatch(detailsOrder(orderId));
    }

  }, [dispatch, order, orderId, successDeliverAndPaid]);

  const deliverAndPaidHandler = () => {
    dispatch(deliverAndPaidOrder(order._id));
  };


  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Pengiriman</h2>
                <p>
                   
                  <strong>Address: </strong> {order.shippingAddress.address}, <br />
                  {order.shippingAddress.city},{' '}
                  {/* {order.shippingAddress.numberContact}, */}
                </p>
                {order.isDeliverAndPaid ? (
                  <MessageBox variant="success">
                    Diantar dan dibayar pada {order.deliverAndPaidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Belum</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pembayaran</h2>
                <p>
                  <strong>Metode Pembayaran:</strong> {order.paymentMethod}
                </p>
                {order.isDeliverAndPaid ? (
                  <MessageBox variant="success">
                    Diantar dan dibayar pada {order.deliverAndPaidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Belum</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x Rp. {item.price} = Rp. {item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>Rp. {order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>Rp. {order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>Rp. {order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>Rp. {order.totalPrice}</strong>
                  </div>
                </div>
              </li>
              {userInfo.isSeller && !order.isDeliverAndPaid && (
                <li>
                  {loadingDeliverAndPaid && <LoadingBox></LoadingBox>}
                  {errorDeliverAndPaid && (
                    <MessageBox variant="danger">{errorDeliverAndPaid}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverAndPaidHandler}
                  >
                    Sudah diantar dan dibayar
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}