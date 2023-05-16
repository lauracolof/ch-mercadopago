const express = require('express');
const router = express.Router()
const { stockCart, postCart, getAll, deleteProduct, deleteAllCart
} = require('../controllers/cart');

router.get('/all', getAll);
router.post('/', postCart);
router.put('/stock', stockCart);
router.delete('/:id', deleteProduct);
router.delete('/all/:id', deleteAllCart);


module.exports = router;


// 1.29.21