import express from "express";
import { getSuggestions, submitSuggestion } from "../controller/suggestion.controller.js";


const router = express.Router();


router.post("/", submitSuggestion);

router.get("/",getSuggestions);

export default router;
