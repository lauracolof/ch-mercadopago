const express = require('express');
const router = express.Router();
const { payment } = require('../controllers/mercadopago');

router.post('/', payment);

module.exports = router;