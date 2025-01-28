import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./route/rental.route.js"; // Importing routes
import contactRoute from "./route/contact.route.js";
import orderRoutes from "./route/order.route.js";
import esewaRoutes from "./route/esewa.route.js";
import userRouter from "./route/userRoute.js";
import cookieParser from "cookie-parser";
import suggestRoute from "./route/suggestion.route.js";
import haversineRoute from "./route/havesine.route.js";
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

async function connectDB() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectDB();

// Define routes
app.use("/api/posts", router);
app.use("/api/contact",contactRoute);
app.use("/user", userRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/esewa", esewaRoutes);
app.use("/api/suggest", suggestRoute);
app.use("/api/haversine", haversineRoute);

app.use("/uploads", express.static("uploads"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
