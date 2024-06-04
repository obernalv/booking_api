const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const results = await Image.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    if (!req.file) return res.status(400).json({message: "Envie la imagen"})
    const {url} = await uploadToCloudinary(req.file);
    const {hotelId} = req.body;

    const result = await Image.create({
        url,
        hotelId
    });
    
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const img = await Image.findByPk(id);
    if(!img) return res.status(404).json({message:"Image not found"})
    await deleteFromCloudinary(img.url);
    await img.destroy();
    return res.sendStatus(204);
});


module.exports = {
    getAll,
    create,
    remove
}