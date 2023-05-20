import './Card.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
const BASE_URL = `http://127.0.0.1/:3001`;

// eslint-disable-next-line react/prop-types
export default function Card({ product, userId }) {
  const [isFav, setIsFav] = useState(false);
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/store/cart/all/${userId}`)
      .then(({ data }) => {
        if (!data.message) {
          const updateCart = data.find(
            (element) => element.productId === product.id
          );
          if (updateCart) setIsCart(true);
        }
      });
  }, []);

  const addCart = () => {
    if (product.stock <= 0) {
      return alert(`Insufficient stock`);
    }

    const productCart = {
      productId: product.id,
      userId: userId,
      amount: 1,
      stock: product.stock,
    };

    axios
      .post(`http://localhost:3001/store/cart`, productCart)
      .then((result) => {
        console.log('Products in home', result.data);
      });
    setIsCart(true);
  };

  const removeCart = () => {
    axios
      .delete(`http://localhost:3001/store/cart/${product.id}`)
      .then((results) => {});
    setIsCart(false);
  };

  return (
    <div className='card'>
      <div className='head-card'>
        {isFav ? (
          <button onClick={() => setIsFav(false)}>❤️</button>
        ) : (
          <button onClick={() => setIsFav(true)}>🤍</button>
        )}
      </div>

      <div className='body-card'>
        <Link className='link' to={`/detail/${product.id}`}>
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.title} />
        </Link>
      </div>

      <div className='footer-card'>
        <h1>U$s {product.price}</h1>
        {isCart ? (
          <button onClick={addCart}>
            <FontAwesomeIcon icon={faShoppingCart} className='cartt' />
            Add to cart
          </button>
        ) : (
          <button onClick={removeCart}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ opacity: 0.8, color: 'white' }}
            />{' '}
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
