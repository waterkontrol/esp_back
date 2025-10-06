// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors()); // Permite conexiones desde cualquier origen
app.use(bodyParser.json()); // Permite recibir JSON en POST

// Ruta POST para recibir datos del ESP32
app.post('/', (req, res) => {
  console.log('Datos recibidos del ESP32:', req.body);

  // Respuesta de confirmación
  res.json({
    status: 'ok',
    received: req.body
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
