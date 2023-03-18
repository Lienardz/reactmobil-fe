import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';
import Axios from 'axios';


export default function ProductListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

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

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      window.alert('Produk sudah dibuat');
      props.history.push('/productlist/seller');
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    // if (errorCreate){
    //   window.alert('Harap segera diisi');
    // }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, successDelete, sellerMode, userInfo._id, createdProduct, props.history, successCreate, errorCreate]);


   const deleteHandler = (product) => {
    if (window.confirm('Apakah yakin untuk menghapus')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct( {
      name,
      price,
      image,
      category,
      year,
      type,
      city,
      brand,
      countInStock,
      description})
    );
  };
  

  return (
    <div>
      <h1>Products</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nama Mobil</th>
              <th>Nama Pemilik</th>
              <th>Harga</th>
              <th>Kategori</th>
              <th>Merk</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.seller.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}`)
                    }
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Ubah
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br /><br />
        <form className='form' onSubmit={createHandler}>
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">Harap Segera Diisi.</MessageBox>}
        <h1>Buat Produk</h1>
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
            <button className="primary" type="submit">
                Buat Produk
              </button>
        </form>
    </div>
  );
}