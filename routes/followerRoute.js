// routes/followerRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const followerController = require('../controllers/followerController');

// Follow a store (accessible to authenticated users)
router.post('/follow', authMiddleware(['user', 'seller', 'admin']), followerController.followStore);

// Unfollow a store (accessible to authenticated users)
router.post('/unfollow', authMiddleware(['user', 'seller', 'admin']), followerController.unfollowStore);

// Get all shop followers (accessible to all users, protected by API key)
router.get('/followers/:storeId', apiKeyMiddleware, followerController.getStoreFollowers);

module.exports = router;
