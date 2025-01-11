import express from "express";
import { submitSuggestion } from "../controller/suggestion.controller.js"; // Import controller

const router = express.Router();

// Route to submit a suggestion
router.post("/api/suggestions", submitSuggestion);

export default router;