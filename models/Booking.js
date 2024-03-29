const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount', required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    bookingSlotId: { type: mongoose.Schema.Types.ObjectId, required: true },
    paid: { type: Boolean, default: false }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
