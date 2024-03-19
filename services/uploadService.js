const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (image) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path);

    // Return the secure URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};
