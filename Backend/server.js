import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend requests

// MongoDB Connection
const mongoURI = process.env.MongoDBURI;
if (!mongoURI) {
    console.error("Mongo URI is not defined in environment variables");
    process.exit(1);
}

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection failed:", error));

// Schema and Model
const dataSchema = new mongoose.Schema({
    originalText: { type: String, required: true },
    encodedText: { type: String, required: true },
});

const EncodedData = mongoose.model("EncodedData", dataSchema);

// API Endpoint: Encode and Save Data
app.post("/api/encode", async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required." });
    }

    try {
        // Generate encoded text
        const encodedText = crypto.createHash("sha256").update(text).digest("hex");

        // Save data to MongoDB
        const newData = new EncodedData({ originalText: text, encodedText });
        await newData.save();

        res.status(201).json({
            message: "Data encoded and saved successfully!",
            data: newData,
        });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: "Failed to save data." });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
