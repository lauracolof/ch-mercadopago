const express = require('express');
const router = express.Router()
const { getUser } = require('../controllers/users.js');

router.get('/all', getUser);


module.exports = router;