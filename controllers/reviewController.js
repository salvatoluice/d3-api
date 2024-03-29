// controllers/reviewController.js
const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { entityType, entityId, reviewerName, reviewText } = req.body;

        const newReview = new Review({
            entityType,
            entityId,
            reviewerName,
            reviewText
        });

        await newReview.save();

        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ review });
    } catch (error) {
        console.error('Error retrieving review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getReviewsByEntityId = async (req, res) => {
    try {
        const { entityId } = req.params;

        const reviews = await Review.find({ entityId }).sort({_id: -1});

        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error retrieving reviews by entity ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { reviewText } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(reviewId, { reviewText }, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
