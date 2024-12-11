import express from "express";
import {getRental} from "../controller/rental.controller.js";

const router = express.Router();

router.get("/",getRental);


export default router;