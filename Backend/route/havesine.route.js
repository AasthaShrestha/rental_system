import express from "express";

import { getRentalsByDistance } from "../controller/haversine.controller.js";
import validateUser from "../middleware/userAuth.middleware.js";


const router = express.Router();

router.get("/", validateUser("any"),getRentalsByDistance);

export default router;
