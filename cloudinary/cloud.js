const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudName, cloudKey, cloudSecret } = require('../config')

cloudinary.config({
    cloud_name: cloudName,
    api_key:cloudKey,
    api_secret: cloudSecret
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'VitSpace',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})
module.exports = { cloudinary, storage}