import { Router } from "express";

const router = Router();

// Ruta principal (ejemplo)
router.get("/", (req, res) => {
  res.json({ message: "¡Bienvenido a la API de login!" });
});

// Ruta de autenticación (puedes expandir esto)
router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {
    return res.status(200).json({ message: "Inicio de sesión exitoso" });
  }
  return res.status(401).json({ message: "Credenciales incorrectas" });
});

export default router;


