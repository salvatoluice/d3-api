// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const authController = require('../controllers/authController');

// Apply API key middleware
// router.use(apiKeyMiddleware);

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Logout user
router.get('/logout', authController.logout);

module.exports = router;
