const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const storeController = require('../controllers/storeController');

router.post('/', authMiddleware('seller'), storeController.createStore);
router.get('/', storeController.getAllStores);
router.get('/:storeId', storeController.getStoreById);
router.put('/:storeId', authMiddleware('seller'), storeController.updateStore);
router.delete('/:storeId', authMiddleware('admin'), storeController.deleteStore);
router.get('/user/:userId/mystores', storeController.getUserStores);

module.exports = router;

