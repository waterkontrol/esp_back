const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta para recibir POST desde ESP32
app.post("/", (req, res) => {
    console.log("Datos recibidos del ESP32:", req.body);
    res.json({ status: "ok", received: req.body });
});

// Ruta opcional para GET de prueba
app.get("/", (req, res) => {
    res.json({ status: "Server up" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
