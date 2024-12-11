import mongoose from "mongoose";
import dotenv from "dotenv";
import { URI } from "./constant.js";

dotenv.config();

const connectDB = async () => {
  await mongoose;
  try {
    await mongoose.connect(URI);
    console.log("Database Connected.");
  } catch (error) {
    console.log("Database Connection Error", error);
  }
};

export default connectDB;
