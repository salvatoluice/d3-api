const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/VoucherController');

router.post('/generate', voucherController.generateVoucher);
router.get('/', voucherController.getAllVouchers);
router.get('/check/:voucherCode', voucherController.checkVoucher);

module.exports = router;
