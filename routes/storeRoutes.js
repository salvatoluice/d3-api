const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const storeController = require('../controllers/storeController');

router.post('/', authMiddleware('seller'), storeController.createStore);
router.get('/', storeController.getAllStores);
router.get('/:storeId', apiKeyMiddleware, storeController.getStoreById);
router.put('/:storeId', authMiddleware('seller'), storeController.updateStore);
router.delete('/:storeId', authMiddleware('admin'), storeController.deleteStore);
router.get('/user/stores', storeController.getUserStores);

module.exports = router;

