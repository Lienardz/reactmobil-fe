import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

export default function UserScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userId = props.match.params.id;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user, } = userDetails;
    
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(detailsUser(userId));
  }, [dispatch, userId]);

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
                    Status: Pembeli
                </li>
                <li>
                     Kontak: {user.contact}
                 </li>
                 <li>
                    <Link to="/profile">Ubah Profil</Link>
                  </li>
            </ul>
        )}
        </div>
        <div className="col-3">

        </div>
    </div>
  )
}
