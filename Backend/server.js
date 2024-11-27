import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import {rentalRoutes} from "../route/rental.route.js";

const app = express();
const PORT = 4001;
const MONGO_URI = "mongodb://localhost:27017/yatrikuti";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/rental", rentalRoutes);

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
