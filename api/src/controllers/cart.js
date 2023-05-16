let shopping_cart = []
const { products } = require('./products')

function stockCart(req, res) {
  //products update
  const { productId, increment } = req.body;
  if (productId) {
    const product = products.filter((elem) => {
      if (elem.id === productId && elem.userId === userId) {
        return elem;
      }
    });
    //if product is in cart
    if (product?.length) {
      if (!increment) {
        // ? product is !== 0, decrement : increment
        if (product[0].stock !== 0) {
          product.stock -= 1;
        } else {
          return res.send(`Insufficient stock`)
        }
      } else {
        product[0].stock += 1;
      }
    }
  }
};

function postCart(req, res) {
  try {
    const { productId, userId } = req.body;
    if (productId && userId) {
      const buyCart = {
        userId, productId
      };
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
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: `Products not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const newCart = shopping_cart.filter((e) => e.productId !== Number(id));
      shopping_cart = newCart;
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: `Products not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}


function deleteAllCart(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const newCart = shopping_cart.filter((e) => e.userId !== Number(id));
      shopping_cart = newCart;
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: `Products not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}


module.exports = { stockCart, postCart, getAll, deleteProduct, deleteAllCart }