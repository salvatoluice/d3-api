const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:reviewId', reviewController.getReviewById);
router.get('/entity/:entityId', reviewController.getReviewsByEntityId);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
