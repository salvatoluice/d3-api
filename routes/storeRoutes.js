// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const storeController = require('../controllers/storeController');

// Create a new store (accessible only to sellers)
router.post('/stores', authMiddleware('seller'), storeController.createStore);
// Get all stores
router.get('/stores', storeController.getAllStores);

// Get a single store by ID
router.get('/stores/:storeId', storeController.getStoreById);

// Update a store by ID
router.put('/stores/:storeId', authMiddleware('seller'), storeController.updateStore);

// Delete a store by ID
router.delete('/stores/:storeId', authMiddleware('admin'), storeController.deleteStore);

module.exports = router;
