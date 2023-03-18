import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  // const [numberContact, setNumberContact] = useState(shippingAddress.numberContact);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, })
    );
    props.history.push('/payment');
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Alamat Pengiriman</h1>
        </div>
        <div>
          <label htmlFor="address">Alamat Pengiriman</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">Kota</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        {/* <div>
          <label htmlFor="numberContact">Nomor Telepon</label>
          <input
            type="text"
            id="numberContact"
            value={numberContact}
            onChange={(e) => setNumberContact(e.target.value)}
            required
          ></input>
        </div> */}
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