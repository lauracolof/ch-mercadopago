import { useEffect, useState } from 'react';
import axios from 'axios';
import './ShoppingCart.css';
const BASE_URL = `http://localhost:3001`;

const insufficient_stock = `Product not available or insufficient stock`;

export default function ShoppingCart({ userId }) {
  const [cartProduct, setCartProduct] = useState();
  const [amount, setAmount] = useState(true);
  const [cartCode, setCartCode] = useState();
  const [initPoint, setInitPoint] = useState(null); //link to send info to back
  let amountProduct = 1;
  let total = 0;

  useEffect(() => {
    axios.get(`${BASE_URL}/store/cart/all/${userId}`).then((productsId) => {
      setCartCode(productsId.data);
      axios.get(`${BASE_URL}/store/product`).then((products) => {
        const productsCart = products.data.filter((product) => {
          if (
            !productsId.data.message &&
            productsId.data.some((obj) => obj.productId === product.id)
          ) {
            return product;
          }
        });
        setCartProduct(productsCart);
        return cartProduct;
      });
    });
  }, [amount]);

  const increment = (productId, increment) => {
    const data = { productId, userId, increment };
    axios.put(`${BASE_URL}/store/cart/stock`, data).then((products) => {
      if (products.data.message === insufficient_stock) {
        return alert(insufficient_stock);
      }
      setAmount(!amount);
    });
  };

  const payment = async () => {
    const description = cartProduct.map((elem) => elem.title).toString();

    const response = await axios
      .post(`${BASE_URL}/store/pay`, {
        description,
        amount: total,
      })
      .then((products) => {
        console.log(products);
      });

    const { init_point } = response.data;
    setInitPoint(init_point);
  };

  return (
    <div className='shopping-cart'>
      <ul>
        {cartProduct &&
          cartProduct.map((product) => (
            <li className='cart_products' key={product.id}>
              <div>
                <h2>{product.title}</h2>
                <p className='total-price'>Price: {product.price}</p>
                <p className='total-price'>Stock: {product.stock}</p>
              </div>

              <div className='amount'>
                <button onClick={() => increment(product.id, true)}>+</button>
                {cartCode
                  ?.filter((e) => product.id === e.productId)
                  .map((e) => {
                    amountProduct = e.amount;
                    total = total + product.price * amountProduct;
                    return <p key={e.productId}>Amount: {amountProduct}</p>;
                  })}
                <button onClick={() => increment(product.id, false)}>-</button>
                <h2 className='total-price'>
                  Subtotal: ${product.price * amountProduct}
                </h2>
              </div>
            </li>
          ))}
      </ul>
      {initPoint && ( //this init point redirect to mercadopago
        <div>
          <h2 style={{ color: 'green' }}>Redirect to MercadoPago</h2>
          {(window.location.href = initPoint)}
        </div>
      )}
      {total != 0 ? ( //show the checkout button only if products are available
        <div>
          <h1 className='total-price'>Total price: ${total}</h1>
          <button onClick={payment} className='checkout-button'>
            Pay
          </button>
        </div>
      ) : (
        <h1 className='total-price'>Add some products</h1>
      )}
    </div>
  );
}
