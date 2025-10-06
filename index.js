// index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3977;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

// Endpoint raíz
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Endpoint de prueba para ESP32
app.post("/test", (req, res) => {
  console.log("🔹 Petición recibida en /test");
  console.log("Body:", req.body);
  res.json({
    status: "success",
    message: "Datos recibidos correctamente",
    received: req.body
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
