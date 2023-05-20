const { insufficient_stock, no_products_in_cart } = require('../Config/product_status.js');

let shopping_cart = []; // [{ productId, userId, amount, stock },{ productId, userId, amount, stock }]
let purchase_orders = []; // here we add the orders
let orderId = 1;
const { updateStockProducts, getStockProduct } = require('./products');

function amountStockCart(req, res) {
  try {
    const { userId, productId, increment } = req.body;
    let stock = getStockProduct(productId);

    if (productId && userId) {
      shopping_cart?.map((e, i) => {
        if (e.productId === productId && e.userId === userId) {
          if (stock && increment && e.amount < stock) {
            // console.log(':: Stock ::', stock)
            e.amount += 1; //increment amount
            return res
              .status(200)
              .json({ message: `Product with ID: ${productId} is increment` });
          } else if (!increment && e.amount > 0) {
            e.amount -= 1; //decrement amount
            return res
              .status(201)
              .json({ message: `Product with ID: ${productId} is decrement` });
          }
        }
      });
      return res.status(404).json({ message: insufficient_stock });
    }
  } catch (error) {
    res
      .status(500)
      .json(`Error in catch response increment`, error)
  }
};

function postCart(req, res) {
  try {
    const { productId, userId, amount, stock } = req.body;
    if (productId && userId && stock > 0) {
      const buyCart = { userId, productId, amount };
      shopping_cart.push(buyCart);
      return res.status(200).json(buyCart);
    } else {
      return res
        .status(404)
        .json({ message: `Products not found` });
    }

  } catch (error) {
    return res
      .status(500)
      .json({ message: error })
  };

}

function getAll(req, res) {
  try {
    const { userId } = req.params;
    if (shopping_cart.length > 0) {
      const cartFiltered = shopping_cart.filter((prod) =>
        Number(userId) === prod.userId
      )
      return res
        .status(200)
        .json(cartFiltered);
    } else {
      return res
        .status(404)
        .json({ message: no_products_in_cart });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error })
  }
}


function deleteAllCart(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const newCart = shopping_cart.filter((elem) =>
        elem.productId !== Number(id)
      );
      shopping_cart = newCart;
      return res
        .status(200)
        .json(shopping_cart);
    } else {
      return res
        .status(404)
        .json({ message: `Products not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
};

//when you buying a product, we put into a purchase order
function buyProducts(req, res) {
  try {
    const { userId, cartCode, total } = req.body; // cartCode -> [{productId: 1, amount: 2, price_by_unit: 345}, {...}]
    if (userId && cartCode && total) {
      const newOrder = {
        id: orderId,
        userId,
        cartCode,
        total
      };
      orderId++;
      //create the order
      purchase_orders.push(newOrder);

      //update the stock 
      for (let x = 0; x < cartCode.length; x++) {
        updateStockProducts(cartCode[x].productId, cartCode[x].amount);
      };

      //remove buy products from the cart when the userId
      const newCart = shopping_cart.filter((prod) => prod.userId !== userId);
      shopping_cart = newCart;

      return res
        .status(200)
        .json({ message: `Order created:`, newOrder });

    } else {
      res
        .status(404)
        .json({ message: `Information missing for the purchase detail` });
    }


  } catch (error) {
    return res.status(500).json({ message: error })
  }
};


module.exports = { amountStockCart, postCart, getAll, deleteAllCart, buyProducts }