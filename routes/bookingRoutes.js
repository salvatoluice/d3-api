const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', bookingController.createBooking);
router.get('/user/get', authMiddleware, bookingController.getUserBookings);
router.get('/', authMiddleware(['user', 'seller', 'admin']), bookingController.getAllBookings);

module.exports = router;
