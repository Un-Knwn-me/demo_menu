const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String
    }
});

const CuisineModel = mongoose.model('cuisine', cuisineSchema)
module.exports = { CuisineModel };