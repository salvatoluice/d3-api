const Booking = require('../models/Booking');
const BookingSlot = require('../models/BookingSlot');
const Discount = require('../models/Discount');

exports.createBooking = async (req, res) => {
    try {
        const { discountId, userId, bookingSlotId, storeId } = req.body;

        const bookingSlot = await BookingSlot.findOne({ _id: bookingSlotId, discountId, booked: false, date: { $gte: new Date() } });
        if (!bookingSlot) {
            return res.status(400).json({ message: 'Booking slot not available or date is in the past' });
        }

        const discount = await Discount.findById(discountId);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        const newBooking = new Booking({
            user: userId,
            discount,
            store: storeId, 
            bookingSlotId,
            paid: false
        });

        await newBooking.save();

        bookingSlot.booked = true;
        await bookingSlot.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await Booking.find({ user: userId })
            .populate('discount', 'name initialPrice discount')
            .populate('store', 'name')
            .populate('bookingSlot', 'date startTime endTime');

        const formattedBookings = bookings.map(booking => {
            return {
                discountName: booking.discount.name,
                storeName: booking.store.name,
                time: new Date(booking.bookingSlotId.date).toLocaleDateString() + ', ' + booking.bookingSlotId.startTime + ' - ' + booking.bookingSlotId.endTime,
                initialPrice: booking.discount.initialPrice,
                discount: booking.discount.discount,
                priceAfterDiscount: booking.discount.initialPrice - booking.discount.discount,
            };
        });

        res.status(200).json({ bookings: formattedBookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name')
            .populate('discount', 'name initialPrice discount')
            .populate('store', 'name');

        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};