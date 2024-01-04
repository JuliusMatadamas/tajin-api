const express = require('express');
const router = express.Router();
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user.model');
const privateKey = process.env.PRIVATE_KEY;

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const user = await User.findOne({ email });

        // Si no se encuentra el usuario
        if (!user) {
            return res.status(401).json({ login: false, message: 'Invalid credentials', token: null });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generar token JWT si las credenciales son válidas
            const token = jwt.sign({ userId: user._id, email: user.email }, privateKey, { expiresIn: '8h' });

            res.json({ login: true, message: 'Successful login', token: token });
        } else {
            res.status(401).json({ login: false, message: 'Invalid credentials', token: null });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ login: false, message: 'server error: ' + error.message, token: null });
    }
});

module.exports = router;
