// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    entityType: { type: String, enum: ['shop', 'discount'], required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    reviewerName: { type: String, required: true },
    reviewDate: { type: Date, default: Date.now },
    reviewText: { type: String, required: true }, // Text of the actual review
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
