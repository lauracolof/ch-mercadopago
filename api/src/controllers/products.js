const jsonData = require('../utils/products.json');

let products = [];

function postProducts(req, res) {
  try {
    products = [...jsonData];
    if (products.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(400).json({ message: `Products not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
};

function getAllProducts(req, res) {
  try {
    if (products.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(200).json({ message: `Products not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
};
function getProductById(req, res) { }

function updateStockProducts(productId, amount) {
  products.map((product) => {
    if (product.id === productId) {
      product.stock = product.stock - amount;
    };
    return product;
  });
};

function getStockProduct(productId) {
  let stock;
  products?.map((product) => {
    if (product.id === productId) {
      stock = product.stock;
    }
  });
  return stock !== undefined ? stock : 0;
};



module.exports = { postProducts, getAllProducts, getProductById, updateStockProducts, getStockProduct };