import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
// import http from "http";
// import { Server } from "socket.io";
import router from "./route/rental.route.js";
import userRoute from "./route/userRoute.js";
const app = express();

app.use(cors());

app.use(express.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to mongoose successfully");
  })
  .catch(() => {
    console.log(err);
  });

//define route

app.use("/api/posts", router);
app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
