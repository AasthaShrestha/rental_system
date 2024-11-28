import express from "express";
import multer from "multer";
import Rental from "../model/rental.model.js";

const router = express.Router();

router.get("/searchSection", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "price";
    let subCategory = req.query.subCategory || "All";

    const RealEstate = ["Single Room", "Double Room", "Flat", "House"];
    subCategory === "All"
      ? (subCategory = [...RealEstate])
      : (subCategory = req.query.subCategory.split(","));

    sort = req.query.sort ? req.query.sort.split(",") : [sort];
    let sortBy = {};
    sortBy[sort[0]] = sort[1] || "asc";

    console.log("Query Parameters:", req.query); // Debugging
    console.log("Filters:", {
      name: { $regex: search, $options: "i" },
      subCategory: { $in: [...subCategory] },
    });

    const posts = await Rental.find({
      name: { $regex: search, $options: "i" },
    })
      .where("subCategory")
      .in([...subCategory])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Rental.countDocuments({
      name: { $regex: search, $options: "i" },
      subCategory: { $in: [...subCategory] },
    });

    res.status(200).json({
      success: true,
      total,
      page: page + 1,
      limit,
      subCategory: RealEstate,
      posts,
    });
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ success: false, message: "Error fetching post" });
  }
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);
    console.log(filePaths);
    console.log(req.file);
    const postData = {
      ...req.body,
      images: filePaths,
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
router.get("/vehicles", async (req, res) => {
  try {
    const posts = await Rental.find({ parentCategory: "Vehicles" });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.get("/rooms", async (req, res) => {
  try {
    const posts = await Rental.find({ parentCategory: "Real Estate" });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.get("/latest", async (req, res) => {
  try {
    const posts = await Rental.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Rental.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching post" });
  }
});

export default router;
