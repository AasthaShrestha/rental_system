import { Router } from "express";

const router = Router();

router.get("/suggest", giveSuggestion);

export default router;
