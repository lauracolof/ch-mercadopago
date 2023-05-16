const express = require('express');
const router = express.Router()
const { postProducts, getProductById, getAllProducts } = require('../controllers/products.js');

router.post('/all', postProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);


module.exports = router;