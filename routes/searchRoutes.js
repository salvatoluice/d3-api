// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const { searchEndpoint } = require('../controllers/searchController');

router.get('/', searchEndpoint);

module.exports = router;
