const express = require('express');
const router = express.Router()
const { postProducts, getAllProducts } = require('../controllers/products.js');

router.post('/all', postProducts);
router.get('/', getAllProducts);


module.exports = router;