import express from "express";
import { submitSuggestion } from "../controller/suggestion.controller.js";


const router = express.Router();


router.post("/", submitSuggestion);

export default router;
