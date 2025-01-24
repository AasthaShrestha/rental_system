import express from "express";
import multer from "multer";
import {
  createRental,
  searchRentals,
  getAllRentals,
  getLatestRentals,
  getRentalById,
  getVehicleByCategory,
  getRoomByCategory,
  updateProduct,
  deleteProduct,
} from "../controller/rental.controller.js";
import validateUser from "../middleware/userAuth.middleware.js";

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
router.post("/", validateUser("any"), upload.array("images", 5), createRental);

router.get("/searchSection", searchRentals);

router.get("/", getAllRentals);

router.get("/vehicles", (req, res) =>
  getVehicleByCategory("Vehicles", req, res)
);

router.get("/rooms", (req, res) => getRoomByCategory("Real Estate", req, res));

router.get("/latest", getLatestRentals);

router.patch("/rooms/edit/:id", updateProduct);
router.patch("/vehicles/edit/:id", updateProduct);

router.delete("/rooms/:id", deleteProduct);
router.delete("/vehicles/:id", deleteProduct);
router.get("/:id", getRentalById);

export default router;
