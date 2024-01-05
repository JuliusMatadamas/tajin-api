const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../database/models/user.model');
const Employee = require('../database/models/employee.model');
const authenticationToken = require('../middleware/auth.middleware');

router.get('/users', authenticationToken, (req, res) => {
    User.find({})
        .then((users) => {
            res.status(201).send(users)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried get users. Error: ' + err.message)
        });
});
router.get('/users/:id', authenticationToken, (req, res) => {
    let id = req.params.id;
    Users.findById({_id : id})
        .then((user) => {
            res.status(201).send(user)
        })
        .catch((err) => {
            res.status(500).send('An error occurred to tried the user. Error: ' + err.message);
        });
});
router.post('/users', authenticationToken, async (req, res) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%&]/;
    const email = req.body.email;
    const password = req.body.password.trim();
    const employeeId = req.body.employeeId;

    if (!emailRegex.test(email)) {
        res.status(500).send('The email address is not valid');
        return;
    }

    if (password.length < 5 || password.length > 10) {
        res.status(500).send('The password must be between 5 and 10 characters long');
        return;
    }

    if (!uppercaseRegex.test(password)) {
        res.status(500).send('The password must have at least one capital letter.');
        return;
    }

    if (!numberRegex.test(password)) {
        res.status(500).send('The password must have at least one number');
        return;
    }

    if (!specialCharRegex.test(password)) {
        res.status(500).send('The password must have at least one of the following characters: !@#$%&');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = {
        email:email,
        password:hashedPassword
    }

    try {
        const employee = await Employee.findOne({ _id: employeeId });

        if (employee && employee.active) {
            user.employeeId = employeeId;
        } else {
            res.status(500).send('The employee id was not found or is no longer active.');
            return;
        }
    } catch (error) {
        res.status(500).send('Internal server error: ' + error.message)
        return;
    }

    User(user).save()
        .then((user) => {
            res.status(201).send(user);
        })
        .catch((err) => {
            res.status(500).send('The user could not be registered in the database. Error: ' + err.message)
        })
});
router.put('/users/:id', authenticationToken, (req, res) => {
    let id = req.params.id;
    // Crear el objeto de reemplazo con los datos del cuerpo de la solicitud
    let updatedUser = {
        email:req.body.email,
        password:req.body.password,
        employeeId:req.body.employeeId,
    };
    // Configuración de opciones para devolver el documento actualizado
    let options = { new: true };
    // Utilizar findOneAndReplace para actualizar la posición
    User.findOneAndReplace({ _id: id }, updatedUser, options)
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).send(user);
        })
        .catch((err) => {
            res.status(500).send('The user could not be updated due to the error: ' + err.message);
        });
});
router.patch('/users/:id', authenticationToken, (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        .then((user) => {
            if (!user) {
                res.status(404).send('User not found');
            }
            res.status(200).send(user);
        })
        .catch((err) => {
            res.status(500).send('The user could not be updated due to the error: ' + err.message)
        });
});
router.delete('/users/:id', authenticationToken, (req, res) => {
    let id = req.params.id;
    // Utilizar findOneAndDelete para eliminar la categoría por su ID
    User.findOneAndDelete({ _id: id })
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).send('User deleted successfully');
        })
        .catch((err) => {
            res.status(500).send('The user could not be deleted due to the error: ' + err.message);
        });
});

module.exports = router;