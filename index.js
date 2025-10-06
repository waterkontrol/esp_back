const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint de prueba
app.post('/test', (req, res) => {
  console.log('Datos recibidos:', req.body);
  res.json({ status: 'ok', received: req.body });
});

// Escucha en el puerto que da Railway y en todas las interfaces
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
