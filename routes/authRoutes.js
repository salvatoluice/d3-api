const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/', authController.getAllUsers);
router.get('/current-user', authMiddleware(['user', 'seller', 'admin']), authController.getCurrentUser);

module.exports = router;
