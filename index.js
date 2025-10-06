// index.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta POST raíz
app.post("/", (req, res) => {
  console.log("Datos recibidos del ESP32:", req.body);

  // Respuesta JSON al ESP32
  res.json({
    status: "success",
    message: "Datos recibidos correctamente",
    received: req.body
  });
});

// Ruta GET de prueba (opcional)
app.get("/", (req, res) => {
  res.send("Servidor ESP32 funcionando!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//version 2
