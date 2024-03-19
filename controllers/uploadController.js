const cloudinary = require('cloudinary').v2;
const uploadService = require('../services/uploadService');

// Initialize Cloudinary SDK
cloudinary.config({
  cloud_name: 'dxgqxyrtu',
  api_key: '372224429276854',
  api_secret: 'cJzVVKn40HfLcZYVB9p-lCOU-qY'
});

exports.uploadImage = async (req, res) => {
  try {
    // Assume the uploaded file is available in req.file
    const uploadedImage = req.file;

    // Upload image to Cloudinary using the upload service
    const imageUrl = await uploadService.uploadImageToCloudinary(uploadedImage);

    // Return the image URL
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
};
