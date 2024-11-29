import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./route/rental.route.js"; // Rental system routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());

app.use(express.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Database connection
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI || process.env.DB_URL;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//define route

app.use("/api/posts", router);


app.use("/uploads", express.static("uploads"));


app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});