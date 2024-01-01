const express = require('express');
const router = express.Router();
const Category = require('../database/models/category.model');
const Product = require('../database/models/product.model');

router.get('/categories', (req, res) => {
    Category.find({})
        .then((categories) => {
            res.status(201).send(categories)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried get categories. Error: ' + err.message)
        });
});
router.get('/categories/:id', (req, res) => {
    let id = req.params.id;
    Category.findById({_id : id})
        .then((category) => {
            res.status(201).send(category)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried the category. Error: ' + err.message);
        });
});
router.get('/categories/:id/products', async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Buscar todos los productos que pertenecen al ID de categoría
        const products = await Product.find({ categoryId: categoryId, active: true });

        res.status(200).send(products);
    } catch (err) {
        res.status(500).send('Error fetching products: ' + err.message);
    }
});

router.post('/categories', (req, res) => {
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
router.put('/categories/:id', (req, res) => {
    let id = req.params.id;
    // Crear el objeto de reemplazo con los datos del cuerpo de la solicitud
    let updatedCategory = {
        name: req.body.name,
        active: req.body.active
    };
    // Configuración de opciones para devolver el documento actualizado
    let options = { new: true };
    // Utilizar findOneAndReplace para actualizar la categoría
    Category.findOneAndReplace({ _id: id }, updatedCategory, options)
        .then((category) => {
            if (!category) {
                return res.status(404).send('Category not found');
            }
            res.status(200).send(category);
        })
        .catch((err) => {
            res.status(500).send('The category could not be updated due to the error: ' + err.message);
        });
});
router.patch('/categories/:id', (req, res) => {
    let id = req.params.id;
    Category.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        .then((category) => {
            if (!category) {
                res.status(404).send('Category not found');
            }
            res.status(200).send(category);
        })
        .catch((err) => {
            res.status(500).send('The category could not be updated due to the error: ' + err.message)
        });
});
router.delete('/categories/:id', (req, res) => {
    let id = req.params.id;
    // Utilizar findOneAndDelete para eliminar la categoría por su ID
    Category.findOneAndDelete({ _id: id })
        .then((category) => {
            if (!category) {
                return res.status(404).send('Category not found');
            }
            res.status(200).send('Category deleted successfully');
        })
        .catch((err) => {
            res.status(500).send('The category could not be deleted due to the error: ' + err.message);
        });
});

module.exports = router;