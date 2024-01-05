const jwt = require('jsonwebtoken');
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const authenticationToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            auth: false,
            error: true,
            message: 'Unauthorized - Token not provided'
        })
    }

    jwt.verify(token, privateKey, (err, res) => {
        if (err) {
            return res.status(401).json({
                auth: false,
                error: true,
                message: 'Forbidden - Invalid token'
            })
        }

        next();
    })
}

module.exports = authenticationToken;