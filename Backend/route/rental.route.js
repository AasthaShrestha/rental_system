import express from "express";
import multer from "multer";
import Rental from "../model/rental.model.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the directory for uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage:storage });

router.post("/", upload.array("image",5), async (req, res) => {
  try {
    console.log(req.file);
    const filePaths = req.files.map((file) => file.path);
    const postData = {
      ...req.body,
      image: filePaths,
    };

    const post = new Rental(postData);
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
