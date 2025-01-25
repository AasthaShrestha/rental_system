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
  getAllExpiredRental,
  freeExpiredRentals,
  freeExpiredRentalsById,
  getUserRentals,
  updateRentalPost,
  deleteRentalPost,
} from "../controller/rental.controller.js";
import validateUser, { optionalValidation } from "../middleware/userAuth.middleware.js";

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

// expire
router.get("/all-expired-rentals",validateUser('any'),getAllExpiredRental)
router.get("/free-expired-rentals",validateUser('any'),freeExpiredRentals)
router.get("/free-expired-rentals-by-id/:rentalId",validateUser('any'),freeExpiredRentalsById)


router.get("/mypost",validateUser('any'),getUserRentals);

router.patch("/mypost/:id", validateUser('any'),updateRentalPost);
router.delete("/mypost/:id", validateUser('any'),deleteRentalPost);


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