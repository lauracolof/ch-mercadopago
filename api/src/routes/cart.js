const express = require('express');
const router = express.Router()
const { amountStockCart, postCart, getAll, deleteAllCart, buyProducts } = require('../controllers/cart');

router.get('/all', getAll);
router.post('/', postCart);
router.put('/stock', amountStockCart);
router.post('/buy', buyProducts);
router.delete('/all/:id', deleteAllCart);


module.exports = router;


// 1.29.21