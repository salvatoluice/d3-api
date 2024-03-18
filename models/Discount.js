// models/Discount.js
const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    initialPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    priceAfterDiscount: { type: Number, required: true },
    percentageDiscount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    category: { type: String },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    serviceTime: { type: String }
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
