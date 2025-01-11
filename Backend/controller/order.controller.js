// order.controller.js

import * as orderService from "../services/order.services.js"; // Import order services (adjust path if needed)
import axios from "axios";
import crypto from "crypto";
import { ApiResponse } from "../utils/ApiResponse.js";
import Order from "../model/order.model.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getWhere();
    res.json(orders);
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const order = await orderService.save({ ...req.body, user: req.user._id });

    const signature = createSignature(
      `total_amount=${order.amount},transaction_uuid=${order._id},product_code=EPAYTEST`
    );

    if (order.payment_method === "esewa") {
      const formData = {
        amount: order.amount,
        failure_url: "http://localhost:5173",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:4001/api/esewa/success",
        tax_amount: "0",
        total_amount: order.amount,
        transaction_uuid: order._id,
      };

      res.json({
        message: "Order Created Successfully",
        order,
        payment_method: "esewa",
        formData,
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

// Update order after payment
export const updateOrderAfterPayment = async (req, res, next) => {
  try {
    console.log(req.body);
    const order = await orderService.findById(req.transaction_uuid);
    order.status = "paid";
    order.transaction_code = req.transaction_code;

    await orderService.save(order);
    res.redirect("http://localhost:5173");
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

// Create a signature for eSewa payment verification
export const createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q"; // Secret key (different in production)

  // Create an HMAC-SHA256 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // Get the digest in base64 format
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};

const getMyOrders = async (req, res) => {
  console.log(req.user);
  if (req.user.roles.includes["Admin"]) {
    const orders = await Order.find();
    return res.json(new ApiResponse(200, "All Orders of all user", orders));
  } else {
    const orders = await Order.find({ user: req.user._id });
    return res.json(new ApiResponse(200, "Your orders only.", orders));
  }
};

export { getMyOrders };
