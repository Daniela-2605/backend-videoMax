import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Database/mongo.js'; // Ruta de tu archivo mongo.js
import userRoutes from './routes/userRoutes.js'; // Ruta de las rutas para usuarios
import cors from 'cors'; // Importar el módulo de CORS

dotenv.config(); // Cargar variables de entorno

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'https://front-video-max.vercel.app', // Dominio del frontend en Vercel
  credentials: true, // Habilitar credenciales si las necesitas
}));

app.use(express.json()); // Para procesar JSON

connectDB(); // Conectar a MongoDB

// Rutas
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
