// routes/discountRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const discountController = require('../controllers/discountController');

// Create a new discount (accessible only to sellers and admins)
router.post('/discounts', authMiddleware(['seller', 'admin']), discountController.createDiscount);

// Apply API key middleware only to routes that don't require authentication
router.use(['/discounts', '/discounts/:discountId'], apiKeyMiddleware);

// Get all discounts
router.get('/discounts', discountController.getAllDiscounts);

// Get a single discount by ID
router.get('/discounts/:discountId', discountController.getDiscountById);

// Update a discount by ID (accessible only to sellers and admins)
router.put('/discounts/:discountId', authMiddleware(['seller', 'admin']), discountController.updateDiscount);

// Delete a discount by ID (accessible only to admins)
router.delete('/discounts/:discountId', authMiddleware(['admin']), discountController.deleteDiscount);

module.exports = router;
