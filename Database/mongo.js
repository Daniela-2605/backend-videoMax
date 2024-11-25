import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Conexión a MongoDB
const connectDB = async () => {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI); // Imprime el valor de MONGO_URI
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error de conexión:', error);
  }
};

export default connectDB;




