const express = require('express');
const router = express.Router();
const Customer = require('../database/models/customer.model');
const Category = require("../database/models/category.model");

router.get('/customers', (req, res) => {
    Customer.find({})
        .then((customers) => {
            res.status(201).send(customers)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried get customers. Error: ' + err.message)
        });
});
router.get('/customers/:id', (req, res) => {
    let id = req.params.id;
    Customer.findById({_id : id})
        .then((customer) => {
            res.status(201).send(customer)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried the customer. Error: ' + err.message);
        });
});
router.post('/customers', (req, res) => {
    let customer = {
        name:req.body.name,
        address:req.body.address,
        colony:req.body.colony,
        zipcode:req.body.zipcode,
    }

    // Verificar si latitude y longitude están presentes en la solicitud antes de asignarlos
    if (req.body.latitude !== undefined) {
        customer.latitude = req.body.latitude;
    }

    if (req.body.longitude !== undefined) {
        customer.longitude = req.body.longitude;
    }

    Customer(customer).save()
        .then((customers) => {
            res.status(201).send(customers);
        })
        .catch((err) => {
            res.status(500).send('The customer could not be registered in the database. Error: ' + err.message)
        })
});
router.patch('/customers/:id', (req, res) => {
    let id = req.params.id;
    Customer.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        .then((customer) => {
            if (!customer) {
                res.status(404).send('Customer not found');
            }
            res.status(200).send(customer);
        })
        .catch((err) => {
            res.status(500).send('The customer could not be updated due to the error: ' + err.message)
        });
});
router.put('/customers/:id', (req, res) => {
    let id = req.params.id;
    // Crear el objeto de reemplazo con los datos del cuerpo de la solicitud
    let updatedCustomer = {
        name:req.body.name,
        address:req.body.address,
        colony:req.body.colony,
        zipcode:req.body.zipcode,
    };
    // Configuración de opciones para devolver el documento actualizado
    let options = { new: true };
    // Utilizar findOneAndReplace para actualizar la categoría
    Customer.findOneAndReplace({ _id: id }, updatedCustomer, options)
        .then((customer) => {
            if (!customer) {
                return res.status(404).send('Customer not found');
            }
            res.status(200).send(customer);
        })
        .catch((err) => {
            res.status(500).send('The costumer could not be updated due to the error: ' + err.message);
        });
});
router.delete('/customers/:id', (req, res) => {
    let id = req.params.id;
    // Utilizar findOneAndDelete para eliminar la categoría por su ID
    Customer.findOneAndDelete({ _id: id })
        .then((customer) => {
            if (!customer) {
                return res.status(404).send('Customer not found');
            }
            res.status(200).send('Customer deleted successfully');
        })
        .catch((err) => {
            res.status(500).send('The customer could not be deleted due to the error: ' + err.message);
        });
});

module.exports = router;