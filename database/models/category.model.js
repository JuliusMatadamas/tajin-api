const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        minLength: 5,
        trim: true,
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true // Agregar campos createdAt y updatedAt
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;