const Booking = require('../models/Booking');
const BookingSlot = require('../models/BookingSlot');
const Discount = require('../models/Discount');

exports.createBooking = async (req, res) => {
    try {
        const { discountId, userId, bookingSlotId } = req.body;

        const bookingSlot = await BookingSlot.findOne({ _id: bookingSlotId, discountId, booked: false, date: { $gte: new Date() } });
        if (!bookingSlot) {
            return res.status(400).json({ message: 'Booking slot not available or date is in the past' });
        }

        const discount = await Discount.findById(discountId);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        // Create booking
        const newBooking = new Booking({
            user: userId,
            discount,
            store: discount.store, // Assuming store is associated with the discount
            bookingSlot,
            paid: false
        });

        await newBooking.save();

        // Update booking slot status
        bookingSlot.booked = true;
        await bookingSlot.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
