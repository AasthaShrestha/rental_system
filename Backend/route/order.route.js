import express from "express";
import { createOrder, getMyOrders } from "../controller/order.controller.js"; // Correct import
import validateUser from "../middleware/userAuth.middleware.js";

const router = express.Router();

router.post("/create", validateUser("any"), createOrder); // Use the createOrder function here

router.get("/myorders", validateUser("any"), getMyOrders);

export default router;
