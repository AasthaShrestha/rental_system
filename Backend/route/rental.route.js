import express from "express";
// import {getRental} from "../controller/rental.controller.js";
import Rental from "../model/rental.model.js"
import multer from "multer";

const router = express.Router();

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

router.post('/', upload.array('images'), async (req, res) => {
  try {
    const { name, description, address, price, parentCategory, subCategory, latitude, longitude } = req.body;

    console.log(req.body);

    // Ensure images are uploaded
    const imagePaths = req.files.map(file => file.path); // Store image paths

    // Save the new post data to the database
    const newPost = new Rental({
      name,
      description,
      address,
      price,
      parentCategory,
      subCategory,
      latitude: parseFloat(latitude),  // Convert to float
      longitude: parseFloat(longitude), // Convert to float
      images: imagePaths,
    });

    await newPost.save();

    console.log("Data saved successfully");

    // Respond with success message and the created post
    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });

  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
});

// Utility function to calculate haversine distance between two coordinates (in km)
const toRadians = (degrees) => (degrees * Math.PI) / 180;

let haversineDistance = (lat1, lon1, lat2, lon2) => {
const R = 6371; // Earth's radius in km
const φ1 = toRadians(lat1); 
const φ2 = toRadians(lat2);
const Δφ = toRadians(lat2 - lat1);
const Δλ = toRadians(lon2 - lon1);

const a =
  Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
  Math.cos(φ1) * Math.cos(φ2) *
  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

return R * c; // Distance in km
};

// GET route to fetch nearby rentals based on user’s location
router.get('/nearby', async (req, res) => {
try {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and Longitude are required.' });
  }

  // Fetch all rentals from the database
  const rentals = await Rental.find();

  // Filter rentals based on proximity
  const nearbyRentals = rentals.filter((rental) => {
    const distance = haversineDistance(parseFloat(latitude), parseFloat(longitude), rental.latitude, rental.longitude);
    return distance <= 10; // Adjust the distance as needed, e.g., 10 km
  });

  // Return the nearby rentals
  res.status(200).json({ nearbyRentals });
} catch (error) {
  console.error('Error fetching nearby rentals:', error);
  res.status(500).json({ message: 'Failed to fetch nearby rentals', error: error.message });
}
});

router.get("/searchSection", async (req, res) => {
  try {
    const search = req.query.search || "";
    const subCategory = req.query.subCategory || "All";

    const filters = {
      name: { $regex: search, $options: "i" }, // Case-insensitive search
    };

    if (subCategory !== "All") {
      filters.subCategory = subCategory.split(",");
    }

    const rooms = await Rental.find(filters).limit(10); // Limit to 10 results for performance

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (err) {
    console.error("Error fetching search results:", err.message);
    res.status(500).json({ success: false, message: "Error fetching results" });
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