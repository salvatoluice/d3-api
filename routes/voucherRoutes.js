const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/VoucherController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/generate', voucherController.generateVoucher);
router.get('/', authMiddleware(['admin']), voucherController.getAllVouchers);
router.get('/check/:voucherCode', authMiddleware(['seller', 'admin']), voucherController.checkVoucher);

module.exports = router;
