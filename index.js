import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configuración de multer para manejo de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configuración de AWS S3 con SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Usuarios ficticios para login (como ejemplo, no usar en producción)
let users = [];

// Registrar un nuevo usuario
app.post('/api/users/register', (req, res) => {
  const { nombre, correo, fechaNacimiento, contrasena } = req.body;

  if (!nombre || !correo || !fechaNacimiento || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Verificar si el correo ya existe
  const existingUser = users.find(user => user.correo === correo);
  if (existingUser) {
    return res.status(400).json({ message: 'Correo ya registrado' });
  }

  const hashedPassword = bcrypt.hashSync(contrasena, 10);

  app.post("/api/videos/upload", (req, res) => {
    const { userId, title, videoFile } = req.body;
    // Guarda el video junto con el ID del usuario
    const video = {
      title,
      videoFile,
      uploadedBy: userId, // Aquí guardas el ID del usuario que subió el video
      dateUploaded: new Date(),
    };
    // Guarda el video en la base de datos o sistema de almacenamiento
    Video.create(video)
      .then((newVideo) => res.status(201).json(newVideo))
      .catch((error) => res.status(500).json({ message: "Error al subir el video." }));
  });

  // Crear el nuevo usuario
  const newUser = {
    nombre,
    correo,
    fechaNacimiento,
    contrasena: hashedPassword,
  };

  users.push(newUser);

  return res.status(200).json({ message: 'Usuario registrado con éxito' });
});

// Iniciar sesión
app.post('/api/users/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.correo === username);
  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.contrasena);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  // Generar un token de sesión
  const token = jwt.sign({ id: user.correo }, 'secreto', { expiresIn: '1h' });

  res.status(200).json({ success: true, message: 'Login exitoso', token });
});

// Subir un video al bucket S3
app.post('/api/videos/upload', upload.single('video'), async (req, res) => {
  const { file } = req;
  const { title } = req.body;

  if (!file || !title) {
    return res.status(400).json({ message: 'Faltan datos (archivo o título).' });
  }

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    // Permisos para que sea público
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    res.status(200).json({ message: 'Video subido con éxito.', url: data.Location });
  } catch (error) {
    console.error('Error al subir el video:', error);
    res.status(500).json({ message: 'Error al subir el video.' });
  }
});

// Obtener la lista de videos del bucket S3
app.get('/api/videos', async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);
    const videos = data.Contents.map(item => ({
      title: item.Key.split('_').slice(1).join('_'),
      url: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
    }));
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error al obtener los videos:', error);
    res.status(500).json({ message: 'Error al obtener los videos.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});




  

