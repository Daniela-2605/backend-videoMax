let users = []; // Simulamos una base de datos en memoria

// Función para registrar un usuario
const registerUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
  }

  // Verificamos si el usuario ya existe
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Registramos al usuario
  users.push({ username, password });
  res.status(201).json({ message: 'Usuario registrado con éxito' });
};

// Función para iniciar sesión
const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Buscamos al usuario en el arreglo
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  res.status(200).json({ message: 'Inicio de sesión exitoso' });
};

module.exports = { registerUser, loginUser };




