import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./route/rental.route.js"; // Rental system routes
import suggestionRoute from "./route/suggestion.route.js";
import orderRoutes from "./route/order.route.js"; // Order routes
import esewaRoutes from "./route/esewa.route.js"; // eSewa routes

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
app.use(suggestionRoute);
app.use("/api/orders", orderRoutes); // Order management routes
app.use("/api/esewa", esewaRoutes); // eSewa payment routes

app.use("/uploads", express.static("uploads"));


app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});