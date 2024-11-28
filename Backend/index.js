import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./route/rental.route.js"; // Rental system routes
import userRoute from "./route/userRoute.js"; // User-related routes
import orderRoutes from "./route/order.route.js"; // Order routes
import esewaRoutes from "./route/esewa.route.js"; // eSewa routes
import rentalRoute from "./route/rental.route.js"; // eSewa routes
import dbConnect from "./config/dbConnect.js";


dotenv.config(); // Load environment variables

const app = express();
dbConnect();

// Middleware
app.use(cors());
app.options("*", cors()); // Handle preflight requests for CORS
app.use(express.json({ limit: "50mb" }));
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

// Routes
app.use("/api/posts", router); // Rental system routes
app.use("/user", userRoute); // User-related routes
app.use("/api/orders", orderRoutes); // Order management routes
app.use("/api/esewa", esewaRoutes); // eSewa payment routes
app.use("/uploads", express.static("uploads")); // Static uploads folder
app.use("/rental",rentalRoute);

// Server initialization
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
