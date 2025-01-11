import express from "express";
import { createOrder } from "../controller/order.controller.js";  // Correct import

const router = express.Router();

router.post("/create", createOrder);  // Use the createOrder function here

export default router;