import express from 'express';
import bcrypt from 'bcryptjs'; // Para encriptar la contraseña
import User from '../models/User.js'; // Asegúrate de que este modelo esté bien configurado

const router = express.Router();

router.post('/register', async (req, res) => {
  const { nombre, correo, fechaNacimiento, contrasena } = req.body;

  // Validar los campos
  if (!nombre || !correo || !fechaNacimiento || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el correo ya existe
    const userExists = await User.findOne({ correo });
    if (userExists) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      nombre,
      correo,
      fechaNacimiento,
      contrasena: hashedPassword,
    });

    // Guardar el usuario en la colección 'users'
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al registrar el usuario' });
  }
});

export default router;

