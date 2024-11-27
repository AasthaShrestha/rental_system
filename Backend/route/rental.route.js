import express from "express";
// import {getRental} from "../controller/rental.controller.js";
import Rental from "../model/rental.model.js";
const router = express.Router();

// router.get("/",getRental);
router.post("/", async (req, res) => {
  try {
    const post = new Rental(req.body);
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Rental.find();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
