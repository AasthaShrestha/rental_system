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
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
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

app.use("/uploads", express.static("uploads"));


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});