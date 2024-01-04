const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
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

const Position = mongoose.model('Position', PositionSchema);

module.exports = Position;