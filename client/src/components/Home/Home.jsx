// import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../Cards/Cards';
const BASE_URL = `http://localhost:3001`;

// eslint-disable-next-line react/prop-types
export default function Home({ userId }) {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/store/product`)
      .then((results) => setProducts(results.data));
  }, []);

  return (
    <div>
      <div className='container'>
        <Cards products={products} userId={userId} />
      </div>
    </div>
  );
}
