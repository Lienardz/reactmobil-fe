import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {

  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [comment, setComment] = useState('');



  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}`);
  };

  const backtoMenu = () => {
    props.history.push("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(
        createReview(productId, {comment, name: userInfo.name })
      );
    } else {
      alert('Mohon diisi tanggapannya');
    }
  };

  return (
     <div>    
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>   
        <button type='button' className='small' onClick={backtoMenu}>Kembali</button>
        <h1>Informasi Produk</h1>
        <br /><br />
        <div className="row top">
          <div className="col-2">
            <img className="large" src={product.image} alt={product.name}></img>
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>Harga: Rp.{product.price}</li>
              <li>
                Kota: {product.city}  
              </li>
              <li>
                Tahun: {product.year}
              </li>
              <li>
                Bahan Bakar: {product.type}
              </li>
              <li>
                Deskripsi:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row">
                    <div>Harga</div>
                    <div className="price">Rp. {product.price}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="success">Tersedia</span>
                      ) : (
                        <span className="danger">Habis</span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Tambahkan ke keranjang
                        </button>
                      </li>
                    </>
                  )}
              </ul>
            </div>
          </div>
        </div>
        <div>  
            <ul>
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Tulis tanggapan user</h2>
                    </div>
                    <div>
                      <label htmlFor="comment">Komentar</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Harap <Link to="/signin">Login</Link> Terlebih dahulu untuk mengisi komentar
                  </MessageBox>
                )}
              </li>
              <h2 id="reviews">Tanggapan</h2>
            {product.reviews.length === 0 && (
              <MessageBox>Tidak ada tanggapan</MessageBox>
            )}
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>  {review.createdAt.substring(0, 10)}
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
            
          </div>
      </div>
      )}
     </div>
  )
}