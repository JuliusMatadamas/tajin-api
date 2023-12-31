const mongoose = require('mongoose');
require('dotenv').config()

const pass = process.env.MONGODB_PASS;
const dbName = 'sales';

mongoose.connect(`mongodb+srv://admin:${pass}@sales.p1to7mr.mongodb.net/${dbName}`)
    .then(() => {
        console.log('Connect success to MongoDB');
    })
    .catch((error) => {
        console.error('An error occurred while connecting to MongoDB. Error: ' + error.message);
    });

module.exports = mongoose;