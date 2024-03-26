// routes/followerRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const followerController = require('../controllers/followerController');

router.post('/follow', authMiddleware(['user', 'seller', 'admin']), followerController.followStore);
router.post('/unfollow', authMiddleware(['user', 'seller', 'admin']), followerController.unfollowStore);
router.get('/:storeId' ,followerController.getStoreFollowers);

module.exports = router;
