import Rental from "../model/rental.model.js";
import path from "path";
import fs from "fs";
import orderModel from "../model/order.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { pid } from "process";
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

const getUserRentals = async (req, res) => {
  const userId = req.user._id; // Assuming the user ID is passed as a route parameter
  try {
    // Find rentals where the user field matches the given user ID
    const posts = await Rental.find({ user: userId });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const updateRentalPost = async (req, res) => {
  const { id } = req.params; // Rental post ID
  const userId = req.user._id; // Authenticated user ID from middleware
  const updateData = req.body; // Data to update

  try {
    // Find the rental post by ID
    const rentalPost = await Rental.findById(id);

    // Check if the post exists
    if (!rentalPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    console.log(rentalPost.user.toString())
    console.log(userId)
    // Check if the logged-in user is the owner of the post
    if (!rentalPost.user.equals(userId)) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }


    // Update the post with new data
    const updatedRental = await Rental.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedRental,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

//deletee by user
const deleteRentalPost = async (req, res) => {
  const { id } = req.params; // Rental post ID
  const userId = req.user._id; // Authenticated user ID from middleware

  try {
    // Find the rental post by ID
    const rentalPost = await Rental.findById(id);

    // Check if the post exists
    if (!rentalPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Check if the logged-in user is the owner of the post
    if (!rentalPost.user.equals(userId)) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    // Delete the rental post
    await Rental.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const getVehicleByCategory = async (category, req, res) => {
  try {
    const { order, subCategory, limit = 9, page = 1 } = req.query; // Get the order, subCategory, limit, and page parameters
    const sortOrder = order === "desc" ? -1 : order === "asc" ? 1 : null; 

    // Set the filters
    const filters = { parentCategory: "Vehicles" };
    if (subCategory && subCategory !== "All") {
      filters.subCategory = subCategory.split(","); 
    }

    // Create the base query
    let postsQuery = Rental.find(filters);

    // Apply sorting if sortOrder is defined
    if (sortOrder !== null) {
      postsQuery = postsQuery.sort({ price: sortOrder });
    }

    // Apply pagination (limit and skip)
    const skip = (page - 1) * limit; 
    postsQuery = postsQuery.limit(parseInt(limit, 10)).skip(skip);

    // Get posts from the database
    const posts = await postsQuery;


    if (!sortOrder) {
      posts.sort(() => Math.random() - 0.5); 
    }

    
    const total = await Rental.countDocuments(filters);

    // Send the response with pagination data
    res.status(200).json({
      success: true,
      data: posts,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit), 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getRoomByCategory = async (category, req, res) => {
  try {
    const { order, subCategory, limit = 9, page = 1 } = req.query; 
    const sortOrder = order === "desc" ? -1 : order === "asc" ? 1 : null;

    // Set filters
    const filters = { parentCategory: "Real Estate" };
    if (subCategory && subCategory !== "All") {
      filters.subCategory = subCategory.split(",");
    }

    let postsQuery = Rental.find(filters);

    // Apply sorting
    if (sortOrder !== null) {
      postsQuery = postsQuery.sort({ price: sortOrder });
    }

    // Pagination logic
    const skip = (page - 1) * limit; 
    postsQuery = postsQuery.limit(parseInt(limit)).skip(skip);

    // Fetch posts
    const posts = await postsQuery;

    // Shuffle if no sorting order
    if (!sortOrder) {
      posts.sort(() => Math.random() - 0.5);
    }
    // Total posts count for pagination
    const total = await Rental.countDocuments(filters);

    // Return data
    res.status(200).json({
      success: true,
      data: posts,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Fetch latest rentals
const getLatestRentals = async (req, res) => {
  try {
    const posts = await Rental.find().sort({ createdAt: -1 }).limit(6);
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

// delete and update section
const updateProduct = async (req, res) => {
  await Rental.updateOne({ _id: req.params.id }, req.body);
  res.json({
    message: "product updated succesfully.",
  });
};

const deleteProduct = async (req, res) => {
  try {
    // product fetch vayo from database with its id
    const product = await Rental.findById(req.params.id);
    // console.log(product,"abcds")
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // ya image path haliyo
    const imagePath = product.images[0];
    console.log(imagePath)
    if (imagePath) {
      // path.resolve garera absolute path banaiyo
      const absolutePath = path.resolve(imagePath);
      //check to file exixtence
      if (fs.existsSync(absolutePath)) {
        //if file exixts,delete
        fs.unlinkSync(absolutePath);
        console.log("File deleted:", absolutePath);
      } else {
        console.warn("File not found:", absolutePath);
      }
    }
    // delete the product from the database
    await Rental.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product and image deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllExpiredRental = async (req,res) => {
  if (!req.user?.roles.includes("Admin")) {
    return res.json(new ApiResponse(403,"Forbidded route. Only for admin"))
  }
  try {
    const currentDate = new Date();
    console.log(currentDate)

    const expiredRentals = await orderModel.find({
      "products.0.endDate": { $lt: currentDate },
    }).lean();
    const ids = []
    expiredRentals.forEach(exp => {
      const prodId = exp.products[0].productId
      ids.push(prodId)
    });
    console.log(ids)

    // const occupiedExpiredRentals = await Rental.find(
    //   { _id: { $in: ids } ,occupied:true }, // Match rentals where `_id` is in the `ids` array
    // ).lean();    

    // const prodIds = []
    // occupiedExpiredRentals.forEach(prod => {
    //   const prodId = prod.orderId
    //   prodIds.push(prodId)
    // });
    

    // const finalExpiredRentals = await orderModel.find({
    //   _id : { $in: prodIds }
    // });

    const occupiedExpiredRentals = await Rental.aggregate([
      {
        $match: {
          _id: { $in: ids },
          occupied: true
        }
      },
      {
        $lookup: {
          from: 'orders',  // Assuming the orders collection is named 'orders'
          localField: 'orderId', // Field in `Rental` that links to `orderModel`
          foreignField: '_id', // Field in `orderModel` that matches `orderId`
          as: 'order' // Alias for the joined data
        }
      },
      {
        $lookup: {
          from: 'users',  
          localField: 'order.user', 
          foreignField: '_id', 
          as: 'userDetail' 
        }
      },
      {
        $unwind: {
          path: '$order', // Unwind the 'order' array to have a single order object
          preserveNullAndEmptyArrays: true // To handle cases where no order is found
        }
      }
    ]);
    

    

    res.json(new ApiResponse(200, "Expired rentals fetched successfully", occupiedExpiredRentals));
  } catch (error) {
    console.log(error)
    res.json(new ApiResponse(500, "Failed to fetch expired rentals"));

  }
}

const freeExpiredRentals = async (req,res) => {
  if (!req.user?.roles.includes("Admin")) {
    return res.json(new ApiResponse(403,"Forbidded route. Only for admin"))
  }
  try {
    const currentDate = new Date();

    const expiredRentals = await orderModel.find({
      "products.0.endDate": { $lt: currentDate },
    });

    const ids = []
    expiredRentals.forEach(exp => {
      const prodId = exp.products[0].productId
      ids.push(prodId)
    });
    
    const freed = await Rental.updateMany(
      { _id: { $in: ids } ,occupied:true }, // Match rentals where `_id` is in the `ids` array
      { $set: { occupied: false } } // Set `occupied` to `false`
    );

    res.json(new ApiResponse(200, ` ${freed.modifiedCount } Expired rentals freed successfully` ,freed));
  } catch (error) {
    res.json(new ApiResponse(500, "Failed to free expired rentals"));

  }
}

const freeExpiredRentalsById = async (req,res) => {
  const rentalId  = req.params.rentalId;

  if (!req.user?.roles.includes("Admin")) {
    return res.json(new ApiResponse(403,"Forbidded route. Only for admin"))
  }
  try {
    
    
    const freed = await Rental.updateOne(
      { _id: rentalId }, // Match rentals where `_id` is in the `ids` array
      { $set: { occupied: false } } // Set `occupied` to `false`
    );

    res.json(new ApiResponse(200, `Expired rentals freed successfully` ,freed));
  } catch (error) {
    res.json(new ApiResponse(500, "Failed to free expired rentals"));

  }
}



export {
  createRental,
  searchRentals,
  getAllRentals,
  getVehicleByCategory,
  getRoomByCategory,
  getLatestRentals,
  getRentalById,
  updateProduct,
  deleteProduct,
  getAllExpiredRental,
  freeExpiredRentals,
  freeExpiredRentalsById,
  getUserRentals,
  updateRentalPost,
  deleteRentalPost,
};