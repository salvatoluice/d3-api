const mongoose = require('mongoose');

const bookingSlotSchema = new mongoose.Schema({
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    booked: {
        type: Boolean,
        default: false
    }
});

const BookingSlot = mongoose.model('BookingSlot', bookingSlotSchema);

module.exports = BookingSlot;
