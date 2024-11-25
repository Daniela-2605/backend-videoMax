import express from 'express';
import cors from 'cors';
import connectDB from './Database/mongo.js';  // Asegúrate de importar correctamente el archivo

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Conectar a MongoDB
connectDB();  // Llamar a la función para conectar a la base de datos

// Usar las rutas de usuario
import userRoutes from './routes/userRoutes.js';  // Asegúrate de incluir la extensión .js
app.use('/api', userRoutes);

// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
