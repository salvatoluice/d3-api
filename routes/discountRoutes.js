// routes/discountRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const discountController = require('../controllers/discountController');

// Create a new discount (accessible only to sellers)
router.post('/discounts', authMiddleware('admin'), discountController.createDiscount);

module.exports = router;
