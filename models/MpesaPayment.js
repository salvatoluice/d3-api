const mongoose = require('mongoose');

const mpesaPaymentSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    payer: {
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    status: { type: String, enum: ['completed', 'pending', 'failed'], default: 'pending' },
    timestamp: { type: Date, default: Date.now }
});

const MpesaPayment = mongoose.model('MpesaPayment', mpesaPaymentSchema);

module.exports = MpesaPayment;
