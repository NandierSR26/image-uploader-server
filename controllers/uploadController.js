const { request } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const uploadImage = async(req = request, res) => {
    try {
        const { tempFilePath } = req.files.imagen
        
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    
        res.send({ secure_url });
    
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    uploadImage
}