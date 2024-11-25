import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true, // Esto garantiza que no haya usuarios con el mismo correo
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;  // Cambia esto a 'export default'
