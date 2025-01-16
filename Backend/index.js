import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./route/rental.route.js"; // Importing routes
import suggestionRoute from "./route/suggestion.route.js";
import orderRoutes from "./route/order.route.js";
import esewaRoutes from "./route/esewa.route.js";
import userRouter from "./route/userRoute.js";
import cookieParser from "cookie-parser";
import suggestRoute from "./route/suggestion.route.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
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

// Define routes
app.use("/api/posts", router);
app.use(suggestionRoute);
app.use("/user", userRouter);
app.use("/api/orders", orderRoutes); // Order management routes
app.use("/api/esewa", esewaRoutes); // eSewa payment routes
app.use("/api/suggest", suggestRoute);

app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});