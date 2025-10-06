import express from "express";
import cors from "cors";
import { sequelize } from "./database/sequelize";
import { startCronJob } from "./cron/schedulesCron";
import http from "http";
import { Server } from "socket.io";
import { MqttService } from "./mqtt/mqtt.service";
import { SocketController } from "./socket/socket.controller";

import authRoutes from "./modules/auth/auth.routes";
import userRouter from "./modules/users/users.routes";
import seriesTypeRouter from "./modules/seriesTypes/series_types.routes";
import deviceRouter from "./modules/devices/devices.routes";
import deviceStatusRouter from "./modules/currentStatus/currentStatuses.routes";
import scheduleRouter from "./modules/schedules/schedules.routes";
import recoverRoutes from "./modules/recover/recover.routes";
import { requireAuth } from "./modules/auth/middlewares/requireAuth";
import { SensorController } from "./mqtt/mqtt.controller";
import { requireActiveUser } from "./modules/auth/middlewares/middlewares";

const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());

// Configuración de Socket.IO
const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: "*", // Replace "*" with specific origins if needed
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/users", userRouter);
app.use("/recover", recoverRoutes);
app.use("/series-types", requireAuth, seriesTypeRouter);
app.use("/devices", requireAuth, requireActiveUser, deviceRouter);
app.use("/devices-public", deviceRouter);
app.use("/device-status", requireAuth, deviceStatusRouter);
app.use("/schedules", requireAuth, scheduleRouter);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const main = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connection established and models synchronized.");
    const mqttService = new MqttService();
    // const sensorController = SensorController.getInstance();
    // await sensorController.initializeSubscriptions();
    new SocketController(io, mqttService);
    const sensorController = new SensorController();

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

main().catch((err) => {
  console.error("Error starting server:", err);
});

// Manejo de conexiones de socket
io.on("connection", (socket) => {
  console.log("Un cliente se conectó:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Guardamos referencia de io en la app
app.set("socketio", io);

startCronJob();