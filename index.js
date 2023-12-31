const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

/**
 * *******************************************API ROUTES*******************************************
 */
app.get('/', (req, res) => {
    res.send('Tajín API');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});