const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

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
app.get('/categories', (req, res) => {
    Category.find({})
        .then((categories) => {
            res.status(201).send(categories)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried get categories. Error: ' + err.message)
        });
});
app.post('/categories', (req, res) => {
    let category = {
        name:req.body.name,
        active:req.body.active
    }

    Category(category).save()
        .then((categories) => {
            res.status(201).send(categories);
        })
        .catch((err) => {
            res.status(500).send('The category could not be registered in the database. Error: ' + err.message)
        })
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});