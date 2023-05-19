import './Details.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = `http://localhost:3001`;

export default function Details() {
  const { id } = useParams;
  const [product, setProduct] = useState();

  useEffect(() => {
    axios.get(`${BASE_URL}/store/product`).then((results) => {
      const productResult = results.data.find((product) => {
        return product.id === Number(id);
      });
      setProduct(productResult);
    });
  }, []);

  return (
    <div className='detail-container'>
      {product ? (
        <div className='info'>
          <div className='detail-image'>
            <img src={product.image} alt={product.title} />
          </div>

          <div className='detail-info'>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Condition: {product.condition}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
