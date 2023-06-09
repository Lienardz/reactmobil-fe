import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.year} {product.name}</h2>
        </Link>
        <div className="row">
          <div className="price">Rp. {product.price}</div>
        </div>
        <div className='row'>
        <div className='type'>Bahan Bakar: {product.type}</div>
        </div>
        <div className='row'>
          <div>
            Diunggah oleh:  
            <Link to={`/seller/${product.seller._id}`}>
            {product.seller.name}
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}