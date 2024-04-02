const Booking = require('../models/Booking');
const BookingSlot = require('../models/BookingSlot');
const Discount = require('../models/Discount');

exports.createBooking = async (req, res) => {
    try {
        const { discountId, userId, bookingSlotId, storeId } = req.body;

        const bookingSlot = await BookingSlot.findOne({ _id: bookingSlotId, discountId, booked: false, date: { $gte: new Date() } });
        console.log(bookingSlot);
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
