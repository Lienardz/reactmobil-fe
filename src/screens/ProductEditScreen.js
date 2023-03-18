import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Axios from 'axios';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;


  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
        window.alert('Produk sudah diubah');
        props.history.push('/productlist/seller');
      }
    if (errorUpdate){
      window.alert('Harap segera diisi');
    }
    if (!product || product._id !== productId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setYear(product.year);
      setType(product.type);
      setImage(product.image);
      setCategory(product.category);
      setCity(product.city);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
    }, [product, dispatch, productId, successUpdate, errorUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          category,
          year,
          type,
          city,
          brand,
          countInStock,
          description,
        })
      );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try{
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    }catch(error){
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  }
  
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product </h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Nama Mobil</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Harga</label>
              <input
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='imageFile'>Gambar File</label>
              <input
                type="file"
                id='imageFile'
                label='Choose Image'
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
            </div>
            <div>
              <label htmlFor="category">Kategori</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Tahun Mobil</label>
              <input
                id="year"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></input>
        </div>
        <div>
              <label htmlFor="type">Bahan Bakar</label>
              <input
                id="type"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></input>
        </div>
            <div>
              <label htmlFor="city">Kota</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Merk</label>
              <input
                id="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Stok Barang</label>
              <input
                id="countInStock"
                type="text"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Deskripsi</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Ubah
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}