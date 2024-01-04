const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        minLength: 2,
        trim: true,
        type: String,
        required: true
    },
    address: {
        trim: true,
        type: String,
        required: true
    },
    colony: {
        minLength: 2,
        trim: true,
        type: String,
        required: true
    },
    zipcode: {
        length: 5,
        type: String,
        validate: {
            validator: function(value) {
                // Validar que el zipcode contiene únicamente números
                return /^\d+$/.test(value);
            },
            message: 'Invalid zipcode format. Should only contain numbers.'
        },
        required: true
    },
    latitude: {
        type: Number,
        default: 19.4086139,
        min: -90,
        max: 90,
        required: true
    },
    longitude: {
        type: Number,
        default: -99.1778345,
        min: -180,
        max: 180,
        required: true
    }
}, {
    timestamps: true // Agregar campos createdAt y updatedAt
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;