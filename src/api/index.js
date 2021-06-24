const express = require('express');

const customer = require('./customer');

const router = express.Router();

router.use('/customer', customer);

module.exports = router;
