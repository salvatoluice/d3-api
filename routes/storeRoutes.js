// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const storeController = require('../controllers/storeController');

// Create a new store (accessible only to sellers)
router.post('/stores', authMiddleware('seller'), storeController.createStore);

// Get all stores (protected by API key)
router.get('/stores', storeController.getAllStores);

// Get a single store by ID (protected by API key)
router.get('/stores/:storeId', apiKeyMiddleware, storeController.getStoreById);

// Update a store by ID (accessible only to sellers)
router.put('/stores/:storeId', authMiddleware('seller'), storeController.updateStore);

// Delete a store by ID (accessible only to admins)
router.delete('/stores/:storeId', authMiddleware('admin'), storeController.deleteStore);

module.exports = router;

