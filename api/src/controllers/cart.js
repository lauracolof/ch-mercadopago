let shopping_cart = [];
let purchase_orders = [];
let orderId = [];
const { updateStockProducts, getStockProduct } = require('./products');

function amountStockCart(req, res) {
  try {
    const { userId, productId, increment } = req.body;
    let stock = getStockProduct(productId);

    if (productId && userId) {
      shopping_cart.map((e, i) => {
        if (e.productId === productId && e.userId === userId) {
          if (increment && e.amount < stock) {
            e.amount += 1;
            return res.status(200).json({ message: `Product with ID: ${productId} is increment` });
          } else if (!increment && e.amount > 0) {
            e.amount -= 1;
            return res.status(200).json({ message: `Product with ID: ${productId} is decrement` });
          }
        }
      });
      return res.status(404).json({ message: `Product not sealed or insufficient stock` });
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
};

function postCart(req, res) {
  try {
    const { productId, userId, amount } = req.body;
    if (productId && userId) {
      const buyCart = { userId, productId, amount };
      shopping_cart.push(buyCart);
      return res.status(200).json(buyCart);
    } else {
      return res.status(404).json({ message: `Products not found` });
    }

  } catch (error) {
    return res.status(500).json({ message: error })
  };

}

function getAll(req, res) {
  try {
    if (shopping_cart.length > 0) {
      return res.status(200).json(shopping_cart);
    } else {
      return res.status(404).json({ message: `Products not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

// function deleteProduct(req, res) {
//   try {
//     const { id } = req.params;
//     if (id) {
//       const newCart = shopping_cart.filter((e) => e.productId !== Number(id));
//       shopping_cart = newCart;
//       return res.status(200).json(product);
//     } else {
//       return res.status(404).json({ message: `Products not found` });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error })
//   }
// }


function deleteAllCart(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const newCart = shopping_cart.filter((e) => e.productId !== Number(id));
      shopping_cart = newCart;
      return res.status(200).json(shopping_cart);
    } else {
      return res.status(404).json({ message: `Products not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
};

function buyProducts(req, res) {
  try {
    const { userId, productId, total } = req.body;
    // productsId -> [{productId: 1, amount: 2, price_by_unit: 345}, {...}]
    if (userId && productId && total) {
      const newOrder = {
        id: orderId,
        userId,
        productId,
        total
      };
      orderId++;
      //create the order
      purchase_orders.push(newOrder);

      //update the stock 
      for (let x = 0; x < productId.length; x++) {
        updateStockProducts(productId[x].productId, productId[x].amount);
      };

      //clean cart
      const newCart = shopping_cart.filter((prod) => prod.userId !== userId);
      shopping_cart = newCart;

      return res.status(200).json({ message: `Order created:`, newOrder });

    } else {
      res.status(404).json({ message: `Information missing for the purchase detail` });
    }


  } catch (error) {
    return res.status(500).json({ message: error })
  }
};


module.exports = { amountStockCart, postCart, getAll, deleteAllCart, buyProducts }