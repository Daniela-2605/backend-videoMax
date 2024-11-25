import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  contrasena: { type: String, required: true },
});

// Especificamos manualmente la colección 'users'
const User = mongoose.model('User', userSchema, 'users');

export default User;
