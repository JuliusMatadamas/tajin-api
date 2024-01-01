const express = require('express');
const router = express.Router();
const Category = require('../database/models/category.model');
const Product = require('../database/models/product.model');

router.get('/products', (req, res) => {
    Product.find({})
        .then((products) => {
            res.status(201).send(products)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried get products. Error: ' + err.message)
        });
});
router.get('/products/:id', (req, res) => {
    let id = req.params.id;
    Product.findById({_id : id})
        .then((product) => {
            res.status(201).send(product)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried the product. Error: ' + err.message);
        });
});
router.post('/products', async (req, res) => {
    try {
        const categoryId = req.body.categoryId;

        // Verificar si la categoría existe y está activa
        const category = await Category.findOne({ _id: categoryId, active: true });

        if (!category) {
            return res.status(400).send('Invalid categoryId or category not active');
        }

        // Crear el objeto de producto después de pasar la validación
        const product = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            price: req.body.price,
            active: req.body.active
        };

        // Guardar el producto en la base de datos
        const savedProduct = await Product(product).save();
        res.status(201).send(savedProduct);
    } catch (err) {
        res.status(500).send('The product could not be registered in the database. Error: ' + err.message);
    }
});
router.patch('/products/:id', (req, res) => {
    let id = req.params.id;
    Product.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        .then((product) => {
            if (!product) {
                res.status(404).send('Product not found');
            }
            res.status(200).send(product);
        })
        .catch((err) => {
            res.status(500).send('The product could not be updated due to the error: ' + err.message)
        });
});
router.put('/products/:id', (req, res) => {
    let id = req.params.id;
    // Crear el objeto de reemplazo con los datos del cuerpo de la solicitud
    let updatedProduct = {
        name: req.body.name,
        categoryId: req.body.categoryId,
        price: req.body.price,
        active: req.body.active
    };
    // Configuración de opciones para devolver el documento actualizado
    let options = { new: true };
    // Utilizar findOneAndReplace para actualizar la categoría
    Product.findOneAndReplace({ _id: id }, updatedProduct, options)
        .then((product) => {
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).send(product);
        })
        .catch((err) => {
            res.status(500).send('The product could not be updated due to the error: ' + err.message);
        });
});
router.delete('/products/:id', (req, res) => {
    let id = req.params.id;
    // Utilizar findOneAndDelete para eliminar la categoría por su ID
    Product.findOneAndDelete({ _id: id })
        .then((product) => {
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).send('Product deleted successfully');
        })
        .catch((err) => {
            res.status(500).send('The product could not be deleted due to the error: ' + err.message);
        });
});

module.exports = router;