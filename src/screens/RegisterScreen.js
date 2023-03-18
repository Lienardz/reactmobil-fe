import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/signin';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Kata Sandi tidak cocok');
    } else {
      dispatch(register(name, contact, email, password, isSeller));
    }
  };
  
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Daftar Akun</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Nama lengkap</label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
              <label htmlFor='contact'>Kontak</label>
                <input
                  id="sellerContact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                ></input>
              </div>
        <div>
          <label htmlFor="email">Alamat Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Kata Sandi</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Ulangi Kata Sandi</label>
          <input
            type="password"
            id="confirmPassword"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
              <label htmlFor="isSeller">Penjual <input id="isSeller" type="checkbox" checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)}></input></label> 
              <label htmlFor="isUser">Pembeli <input id="isUser" type="checkbox" checked={isUser} onChange={(e) => setIsUser(e.target.checked)}></input></label> 
            </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Daftar
          </button>
        </div>
        <div>
          <label />
          <div>
            Sudah mempunyai akun?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Masuk</Link>
          </div>
        </div>
      </form>
    </div>
  );
}