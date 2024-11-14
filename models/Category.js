const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    cuisineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cuisine'
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String
    }
});

const CategoryModel = mongoose.model('category', categorySchema)
module.exports = { CategoryModel };