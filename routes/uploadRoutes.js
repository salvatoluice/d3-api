// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadToS3 = require('../utils/s3Upload');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload image to S3 (protected by API key)
router.post('/upload', apiKeyMiddleware, upload.single('image'), async (req, res) => {
    try {
        const imageUrl = await uploadToS3(req.file);
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
