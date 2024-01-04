const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstname: {
        minLength: 5,
        trim: true,
        type: String,
        required: true,
        match: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
    },
    lastname: {
        minLength: 5,
        trim: true,
        type: String,
        required: true,
        match: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
    },
    personalEmail: {
        type: String,
        trim: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true
    },
    mobileNumber: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v) && !v.startsWith('0');
            },
            message: 'Mobile number must be 10 digits and should not start with 0.'
        }
    },
    positionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        validate: {
            validator: async function (value) {
                const position = await mongoose.model('Position').findById(value);
                return position && position.active === true;
            },
            message: 'Invalid position or position is not active.'
        }
    },
    address: {
        type: String
    },
    colony: {
        type: String
    },
    zipCode: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{5}$/.test(v);
            },
            message: 'Zip code must be 5 digits.'
        }
    },
    start: {
        type: Date
    },
    ending: {
        type: Date
    },
    active: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true // Agregar campos createdAt y updatedAt
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;