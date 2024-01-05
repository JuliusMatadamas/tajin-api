const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;

router.post('/validate-token', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(404).json({
            auth: false,
            error: true,
            message: 'Unauthorized - Token not provided'
        });
    }

    jwt.verify(token, privateKey, (err, user) => {
        if (err) {
            return res.status(403).json({
                auth: false,
                error: true,
                message: 'Forbidden - Invalid token'
            })
        }

        return res.status(200).json({
            auth: true,
            error: false,
            message: 'Success - valid token'
        });
    });
});

module.exports = router;