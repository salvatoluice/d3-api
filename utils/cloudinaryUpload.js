const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, { folder: 'uploads' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url); // Cloudinary file URL
      }
    });
  });
};

module.exports = uploadToCloudinary;
