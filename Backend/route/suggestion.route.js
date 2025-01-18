import express from "express";
import validateUser from "../middleware/userAuth.middleware.js";
import {  getSuggestedRoom, getSuggestedVehicle } from "../controller/suggest.controller.js";

const router = express.Router();

// Route to submit a suggestion
router.get("/room", validateUser("any"), getSuggestedRoom);

router.get("/vehicle", validateUser("any"), getSuggestedVehicle);


export default router;
