import User from "../model/user.model.js"; // Adjust the path to your User model
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller to verify KYC
const addKyc = async (req, res, next) => {
  try {
    const {  idType, idNumber } = req.body;
    const userId = req.user._id
    const photoUrl = req.files.map((file) => file.path);

    // // Validate request payload
    // if (!userId || !kycDetails) {
    //   throw new ApiError(400, "User ID and KYC details are required");
    // }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    // Update user KYC details
    user.kycStatus = true; // Example status
    user.kycDetails = {idType,idNumber,photoUrl}; // Store the KYC details
    

    await user.save();

    // Respond with success
    res.json(new ApiResponse(200, "KYC verified successfully", { userId: user._id, kycStatus: user.kycStatus }));
  } catch (error) {
    // Pass errors to error-handling middleware
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

export {addKyc};
