const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        trim: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        trim: true,
        type: String,
    },
    employeeId: {
        ref: 'Employee',
        required: [true, 'El campo de ID de empleado es obligatorio.'],
        type: mongoose.Schema.Types.ObjectId,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
