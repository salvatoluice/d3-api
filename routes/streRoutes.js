// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const storeController = require('../controllers/storeController');

// Create a new store (accessible only to sellers)
router.post('/stores', authMiddleware('seller'), storeController.createStore);

module.exports = router;
