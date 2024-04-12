const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount', required: true },
    used: { type: Boolean, default: false }
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
