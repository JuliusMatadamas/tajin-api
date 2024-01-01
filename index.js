const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const categoriesRoutes = require('./routes/categories.routes');

/**
 * *********************************************MODELS*********************************************
 */
const Category = require('./database/models/category.model');

/**
 * *******************************************API ROUTES*******************************************
 */
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', (req, res) => {
    res.send('Tajín API');
});
/**
 * *******************************************CATEGORIES*******************************************
 */
app.use(categoriesRoutes);

app.listen(3000, () => {
    console.log('listening on port 3000');
});