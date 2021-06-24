const express = require('express');

const CustomerController = require('../controller/customer');

const router = express.Router();

router.get('/', (req, res) => {
	res.json(['😀', '😳', '🙄']);
});

router.post('/add', CustomerController.createCustomer);

module.exports = router;
