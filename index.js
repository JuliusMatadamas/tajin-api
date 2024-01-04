const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const categoriesRoutes = require('./routes/categories.routes');
const productsRoutes = require('./routes/products.routes');
const customersRoutes = require('./routes/customers.routes');
const positionsRoutes = require('./routes/positions.routes');
const employeesRoutes = require('./routes/employees.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

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
app.use(categoriesRoutes);
app.use(productsRoutes);
app.use(customersRoutes);
app.use(positionsRoutes);
app.use(employeesRoutes);
app.use(usersRoutes);
app.use(authRoutes);

app.listen(3000, () => {
    console.log('listening on port 3000');
});