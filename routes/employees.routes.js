const express = require('express');
const router = express.Router();
const Employee = require('../database/models/employee.model');

router.get('/employees', (req, res) => {
    Employee.find({})
        .then((employees) => {
            res.status(201).send(employees)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried get employees. Error: ' + err.message)
        });
});
router.get('/employees/:id', (req, res) => {
    let id = req.params.id;
    Employee.findById({_id : id})
        .then((employee) => {
            res.status(201).send(employee)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried the employee. Error: ' + err.message);
        });
});
router.post('/employees', (req, res) => {
    let employee = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        personalEmail:req.body.personalEmail,
        mobileNumber:req.body.mobileNumber,
        positionId:req.body.positionId,
        address:req.body.address,
        colony:req.body.colony,
        zipCode:req.body.zipCode,
        start:req.body.start,
        ending:req.body.ending,
        active:req.body.active
    }

    Employee(employee).save()
        .then((employee) => {
            res.status(201).send(employee);
        })
        .catch((err) => {
            res.status(500).send('The employee could not be registered in the database. Error: ' + err.message)
        })
});
router.put('/employees/:id', (req, res) => {
    let id = req.params.id;
    // Crear el objeto de reemplazo con los datos del cuerpo de la solicitud
    let updatedEmployee = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        personalEmail:req.body.personalEmail,
        mobileNumber:req.body.mobileNumber,
        positionId:req.body.positionId,
        address:req.body.address,
        colony:req.body.colony,
        zipCode:req.body.zipCode,
        start:req.body.start,
        ending:req.body.ending,
        active:req.body.active
    };
    // Configuración de opciones para devolver el documento actualizado
    let options = { new: true };
    // Utilizar findOneAndReplace para actualizar la posición
    Employee.findOneAndReplace({ _id: id }, updatedEmployee, options)
        .then((employee) => {
            if (!employee) {
                return res.status(404).send('Employee not found');
            }
            res.status(200).send(employee);
        })
        .catch((err) => {
            res.status(500).send('The employee could not be updated due to the error: ' + err.message);
        });
});
router.patch('/employees/:id', (req, res) => {
    let id = req.params.id;
    Employee.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        .then((employee) => {
            if (!employee) {
                res.status(404).send('Employee not found');
            }
            res.status(200).send(employee);
        })
        .catch((err) => {
            res.status(500).send('The employee could not be updated due to the error: ' + err.message)
        });
});
router.delete('/employees/:id', (req, res) => {
    let id = req.params.id;
    // Utilizar findOneAndDelete para eliminar la categoría por su ID
    Employee.findOneAndDelete({ _id: id })
        .then((employee) => {
            if (!employee) {
                return res.status(404).send('Employee not found');
            }
            res.status(200).send('Employee deleted successfully');
        })
        .catch((err) => {
            res.status(500).send('The employee could not be deleted due to the error: ' + err.message);
        });
});

module.exports = router;