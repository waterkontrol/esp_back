const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta POST de prueba
app.post("/test", (req, res) => {
  console.log("Datos recibidos:", req.body);
  res.json({ status: "ok", received: req.body });
});

// Puerto asignado por Railway o 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
