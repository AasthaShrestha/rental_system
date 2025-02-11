import express from "express";
import { submitSuggestion } from "../controller/suggestion.controller.js"; // Import controller
import validateUser from "../middleware/userAuth.middleware.js";
import { getSuggested } from "../controller/suggest.controller.js";

const router = express.Router();

// Route to submit a suggestion
router.get("/", validateUser("any"), getSuggested);

export default router;
