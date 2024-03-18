// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/reviews', reviewController.createReview);

// Get all reviews
router.get('/reviews', reviewController.getAllReviews);

// Get a single review by ID
router.get('/reviews/:reviewId', reviewController.getReviewById);

// Update a review by ID
router.put('/reviews/:reviewId', reviewController.updateReview);

// Delete a review by ID
router.delete('/reviews/:reviewId', reviewController.deleteReview);

module.exports = router;
