const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadToS3 = require('../utils/s3Uploads');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = await uploadToS3(req.file);
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
