const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// Endpoint de prueba
app.post('/test', (req, res) => {
  console.log('Datos recibidos:', req.body);
  res.json({ status: 'ok', received: req.body });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
