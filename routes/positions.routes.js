const express = require('express');
const router = express.Router();
const Position = require('../database/models/position.model');
const Employee = require('../database/models/employee.model');
const authenticationToken = require('../middleware/auth.middleware');

router.get('/positions', authenticationToken, (req, res) => {
    Position.find({})
        .then((positions) => {
            res.status(201).send(positions)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried get positions. Error: ' + err.message)
        });
});
router.get('/positions/:id', authenticationToken, (req, res) => {
    let id = req.params.id;
    Position.findById({_id : id})
        .then((position) => {
            res.status(201).send(position)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried the position. Error: ' + err.message);
        });
});
router.get('/positions/:id/employees', authenticationToken, async (req, res) => {
    try {
        const positionId = req.params.id;

        // Buscar todos los empleados que pertenecen al ID de posición
        const employees = await Employee.find({ positionId: positionId, active: true });

        res.status(200).send(employees);
    } catch (err) {
        res.status(500).send('Error fetching employees: ' + err.message);
    }
});

router.post('/positions', authenticationToken, (req, res) => {
    let position = {
        name:req.body.name,
        active:req.body.active
    }

    Position(position).save()
        .then((positions) => {
            res.status(201).send(positions);
        })
        .catch((err) => {
            res.status(500).send('The positions could not be registered in the database. Error: ' + err.message)
        })
});
router.put('/positions/:id', authenticationToken, (req, res) => {
    let id = req.params.id;
    // Crear el objeto de reemplazo con los datos del cuerpo de la solicitud
    let updatedPosition = {
        name: req.body.name,
        active: req.body.active
    };
    // Configuración de opciones para devolver el documento actualizado
    let options = { new: true };
    // Utilizar findOneAndReplace para actualizar la posición
    Position.findOneAndReplace({ _id: id }, updatedPosition, options)
        .then((position) => {
            if (!position) {
                return res.status(404).send('Position not found');
            }
            res.status(200).send(position);
        })
        .catch((err) => {
            res.status(500).send('The position could not be updated due to the error: ' + err.message);
        });
});
router.patch('/positions/:id', authenticationToken, (req, res) => {
    let id = req.params.id;
    Position.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        .then((position) => {
            if (!position) {
                res.status(404).send('Position not found');
            }
            res.status(200).send(position);
        })
        .catch((err) => {
            res.status(500).send('The position could not be updated due to the error: ' + err.message)
        });
});
router.delete('/positions/:id', authenticationToken, (req, res) => {
    let id = req.params.id;
    // Utilizar findOneAndDelete para eliminar la categoría por su ID
    Position.findOneAndDelete({ _id: id })
        .then((position) => {
            if (!position) {
                return res.status(404).send('Position not found');
            }
            res.status(200).send('Position deleted successfully');
        })
        .catch((err) => {
            res.status(500).send('The position could not be deleted due to the error: ' + err.message);
        });
});

module.exports = router;