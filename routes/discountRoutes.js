const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const discountController = require('../controllers/discountController');

router.post('/', authMiddleware(['seller', 'admin']), discountController.createDiscount);
router.post('/generate-booking-slots', discountController.generateBookingSlots);
router.get('/', discountController.getAllDiscounts);
router.get('/shop/:shopId', discountController.getDiscountsByShop);
router.get('/:discountId', discountController.getDiscountById);
router.put('/:discountId', authMiddleware(['seller', 'admin']), discountController.updateDiscount);
router.delete('/:discountId', authMiddleware(['admin']), discountController.deleteDiscount);

module.exports = router;
