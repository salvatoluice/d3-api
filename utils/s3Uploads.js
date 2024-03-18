// utils/s3Upload.js
const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const uploadToS3 = (file) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: process.env.S3_BUCKET,
        Key: `${Date.now()}_${file.originalname}`, // Unique file name in S3
        Body: fileStream
    };

    return new Promise((resolve, reject) => {
        s3.upload(uploadParams, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.Location); // S3 file URL
            }
        });
    });
};

module.exports = uploadToS3;
