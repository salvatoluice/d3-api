// routes/followerRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const followerController = require('../controllers/followerController');

// Follow a store (accessible to authenticated users)
router.post('/follow', authMiddleware('user'), followerController.followStore);

// Unfollow a store (accessible to authenticated users)
router.post('/unfollow', authMiddleware('user'), followerController.unfollowStore);

// Get all shop followers (accessible to all users)
router.get('/followers/:storeId', followerController.getStoreFollowers);

module.exports = router;
