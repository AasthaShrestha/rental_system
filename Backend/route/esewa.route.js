// esewa.route.js

import express from "express"; // Use ES module import syntax
import { handleEsewaSuccess } from "../controller/esewa.controller.js";  // Ensure correct import path
import { updateOrderAfterPayment } from "../controller/order.controller.js"; // Import updateOrderAfterPayment controller

const router = express.Router();

// Define the route
router.get("/success", handleEsewaSuccess, updateOrderAfterPayment);

// Export the router using ES module syntax
export default router;