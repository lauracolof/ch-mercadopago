const express = require('express');
const router = express.Router();
const users = require('./users');
const products = require('./products');
const cart = require('./cart');

router.use('/user', users);
router.use('/cart', cart);
router.use('/product', products);

module.exports = router;