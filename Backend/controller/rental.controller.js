import Rental from "../model/rental.model.js";

const getRooms = async (req, res) => {
  const { limit, page } = req.query;
  const sort = {};

  if (req.query.priceOrder) {
    sort.price = req.query.priceOrder;
  }

  // page = 1 = skip = 0
  // page 2 = skip = 5 (limit = 5)
  // page 3 = skiep = 10 (limit = 5)

  // skip = (page -1) * limit
  const filter = {};
  if (req.query.minPrice && req.query.maxPrice) {
    filter.price = {
      $gte: req.query.minPrice,
      $lte: req.query.maxPrice,
    };
  }
  const posts = await Product.find(filter)
    .sort(sort)
    .limit(limit)
    .skip((page - 1) * limit); // -1,1, asc, desc
  const total = await Product.countDocuments(filter);
  res.json({
    total,
    data: posts,
  });
};
// Create a new rental
const createRental = async (req, res) => {
  console.log(req.headers.token);
  try {
    const filePaths = req.files.map((file) => file.path);
    const postData = {
      ...req.body,
      images: filePaths,
      user: req.user._id,
    };

    const post = new Rental(postData);
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Search rentals
const searchRentals = async (req, res) => {
  try {
    const search = req.query.search || "";
    const subCategory = req.query.subCategory || "All";

    const filters = {
      name: { $regex: search, $options: "i" },
    };

    if (subCategory !== "All") {
      filters.subCategory = subCategory.split(",");
    }

    const rooms = await Rental.find(filters).limit(10);
    res.status(200).json({ success: true, rooms });
  } catch (err) {
    console.error("Error fetching search results:", err.message);
    res.status(500).json({ success: false, message: "Error fetching results" });
  }
};

// Fetch all rentals
const getAllRentals = async (req, res) => {
  try {
    const posts = await Rental.find();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch rentals by category (e.g., Vehicles or Rooms)
const getRentalsByCategory = async (category, req, res) => {
  try {
    const posts = await Rental.find({ parentCategory: category });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch latest rentals
const getLatestRentals = async (req, res) => {
  try {
    const posts = await Rental.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch a single rental by ID
const getRentalById = async (req, res) => {
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
};

export {
  getRooms,
  createRental,
  searchRentals,
  getAllRentals,
  getRentalsByCategory,
  getLatestRentals,
  getRentalById,
};
