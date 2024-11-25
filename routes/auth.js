// routes/auth.js
const express = require('express');
const User = require('../models/User'); // Importar el modelo de usuario
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error al registrar el usuario.' });
  }
});

module.exports = router;
