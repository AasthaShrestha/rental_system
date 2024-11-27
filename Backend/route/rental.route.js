import express from "express";

import { createRental, getAllRentals } from "../controller/rentalController.js";

const router = express.Router();

// Route to create a rental
router.post("/", createRental);

// Route to get all rentals
router.get("/", getAllRentals);

module.exports = router;
