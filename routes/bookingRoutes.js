const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/user/get', authMiddleware, bookingController.getUserBookings);
router.get('/', authMiddleware, bookingController.getAllBookings);

module.exports = router;
