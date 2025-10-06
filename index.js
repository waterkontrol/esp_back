import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("📥 Datos recibidos:", req.body);
  res.json({ status: "ok", received: req.body });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
//version 3