const jsonData = require('../utils/products.json');

let products = [];

function postProducts(req, res) {
  try {
    products = jsonData;
    if (products.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(200).json({ message: `Products not found` });
    }

  } catch (error) {
    return res.status(500).json({ message: error })
  }
};

function getAllProducts(req, res) {
  try {
    products = jsonData;
    if (products.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(200).json({ message: `Products not found` });
    }

  } catch (error) {
    return res.status(500).json({ message: error })
  }
}


function getProductById(req, res) { }

module.exports = { postProducts, getProductById, getAllProducts };