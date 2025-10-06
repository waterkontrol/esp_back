const express = require('express');
const app = express();
const port = 3000;

// Middleware para recibir JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor ESP32 prueba funcionando!');
});

// Ruta de prueba para recibir datos del ESP32
app.post('/esp-data', (req, res) => {
  console.log('Datos recibidos del ESP32:', req.body);
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
