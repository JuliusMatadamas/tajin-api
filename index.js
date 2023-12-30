const express = require('express');
const app = express();

/**
 * *******************************************API ROUTES*******************************************
 */
app.get('/', (req, res) => {
    res.send('Tajín API');
});

app.listen(3000, (req, res) => {
    console.log('listening on port 3000');
});