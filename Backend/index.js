import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import rentalRoute from "./route/rental.route.js"; // Rental system routes
import userRoute from "./route/userRoute.js"; // User-related routes
import orderRoutes from "./route/order.route.js"; // Order routes
import esewaRoutes from "./route/esewa.route.js"; // eSewa routes
import suggestionRoute from "./route/suggestion.route.js"; // Import suggestion route

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.options("*", cors()); // Handle preflight requests for CORS
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Database connection
const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI || process.env.DB_URL;

if (!URI) {
    console.error("MongoDB URI is not set in environment variables.");
    process.exit(1);
}

mongoose
    .connect(URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    });

// Use the suggestion routes
app.use(suggestionRoute); // Use the suggestion route for suggestion submission

// Existing routes
app.use("/api/posts", rentalRoute); // Rental system routes
app.use("/user", userRoute); // User-related routes
app.use("/api/orders", orderRoutes); // Order management routes
app.use("/api/esewa", esewaRoutes); // eSewa payment routes
app.use("/uploads", express.static("uploads")); // Static uploads folder

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await mongoose.disconnect();
    process.exit(0);
});

// Server initialization
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
