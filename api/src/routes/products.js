const express = require('express');
const router = express.Router()
const { postProducts, getAllProducts, getProductById } = require('../controllers/products.js');

router.post('/all', postProducts);
router.get('/:id', getProductById)
router.get('/', getAllProducts);


module.exports = router;