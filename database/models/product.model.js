const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        minLength: 5,
        trim: true,
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        validate: {
            validator: function(value) {
                // Validar que el valor sea un número con máximo 2 decimales y máximo un entero de 4 cifras
                const regex = /^\d{1,4}(\.\d{1,2})?$/;
                return regex.test(value.toString());
            },
            message: 'Invalid price format. Should be a number with maximum 2 decimals and maximum 4 digits (e.g., 9999.99)'
        },
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true // Agregar campos createdAt y updatedAt
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;