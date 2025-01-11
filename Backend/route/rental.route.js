import express from "express";
import multer from "multer";
import {
  createRental,
  searchRentals,
  getAllRentals,
  getRentalsByCategory,
  getLatestRentals,
  getRentalById,
} from "../controller/rental.controller.js";
import { checkAuth } from "../middleware/userAuth.middleware.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Routes
router.post("/", checkAuth("Admin"), upload.array("images", 5), createRental);
router.get("/searchSection", searchRentals);
router.get("/", getAllRentals);
router.get("/vehicles", (req, res) =>
  getRentalsByCategory("Vehicles", req, res)
);
router.get("/rooms", (req, res) =>
  getRentalsByCategory("Real Estate", req, res)
);
router.get("/latest", getLatestRentals);
router.get("/:id", getRentalById);

export default router;
