const express = require('express');
const router = express.Router();

const {pay}=require('../controller/razorpay_controller')

router.post('/payment/order',pay)

module.exports = router;
