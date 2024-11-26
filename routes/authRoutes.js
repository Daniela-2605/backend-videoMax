const express = require('express');
const { registerUser, loginUser } = require('../controllers/Controller.js');
const router = express.Router();

// Ruta para registro de usuario
router.post('/register', registerUser);

// Ruta para inicio de sesión
router.post('/login', loginUser);

module.exports = router;
