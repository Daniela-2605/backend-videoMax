import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = 5000;

// Usamos JSON para las peticiones
app.use(express.json());
app.use(cors());

// Array temporal para almacenar los usuarios
let users = [];

// Ruta para manejar el registro
app.post("/register", (req, res) => {
  const { nombre, fechaNacimiento, correo, contrasena } = req.body;

  // Validación simple
  if (!nombre || !fechaNacimiento || !correo || !contrasena) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  // Guardamos al usuario en el array
  const newUser = { nombre, fechaNacimiento, correo, contrasena };
  users.push(newUser);

  res.status(200).json({ message: "Usuario registrado con éxito!" });
});

// Ruta para manejar el login (puedes ajustarla según cómo necesites)
app.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  const user = users.find(user => user.correo === correo && user.contrasena === contrasena);

  if (!user) {
    return res.status(400).json({ message: "Credenciales incorrectas" });
  }

  res.status(200).json({ message: "Login exitoso" });
});

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});

