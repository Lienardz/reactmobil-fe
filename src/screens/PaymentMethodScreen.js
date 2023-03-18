import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Metode Pembayaran</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="banktransfer"
              value="banktransfer"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="CashOnDelivery">CashOnDelivery</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Lanjut
          </button>
        </div>
      </form>
    </div>
  );
}