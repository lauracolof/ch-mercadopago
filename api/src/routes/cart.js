const express = require('express');
const router = express.Router()
const { amountStockCart, postCart, getAll, deleteAllCart, buyProducts } = require('../controllers/cart');


router.get('/all/:userId', getAll);
router.post('/', postCart);
router.put('/stock', amountStockCart);
router.delete('/:id', deleteAllCart);
router.post('/buy', buyProducts);


module.exports = router;
