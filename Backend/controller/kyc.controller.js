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
    user.kycFilled = true
    

    await user.save();

    // Respond with success
    res.json(new ApiResponse(200, "KYC added. Pending verification", { userId: user._id, kycStatus: user.kycStatus }));
  } catch (error) {
    // Pass errors to error-handling middleware
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

const getAllUnverifiedKyc = async (req,res)=> {
    try {
        console.log(req.user)
        if (req.user.roles.includes("Admin")) {

        
            const users = await User.find({kycVerified:false,kycFilled:true});
            console.log(users)
            return res.json(new ApiResponse(200,"Pending verificaiton Users:",users))
        }else{
            return res.json(new ApiResponse(403,"Forbidded route. Only for admin"))
        }
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"Something went wrong ")
    }
}

const verifyKyc = async (req,res) => {
    const userId = req.params.userId;
    if (!req.user.roles.includes("Admin")) {
        return res.json(new ApiResponse(403,"Forbidded route. Only for admin"))
    }

    try{
        const user = await User.findOne({_id:userId});
        if (!user) {
            return res.json(new ApiResponse(404,"User not found"))
        }
        user.kycVerified = true;
        await user.save()
        return res.json(new ApiResponse(200,"Kyc Verified"))

    }catch(err){
        return res.json(new ApiResponse(500,"something went wrong"))
    }
}

const declineKyc = async (req,res) => {
    const userId = req.params.userId;
    if (!req.user.roles.includes("Admin")) {
        return res.json(new ApiResponse(403,"Forbidded route. Only for admin"))
    }

    try{
        const user = await User.findOne({_id:userId});
        if (!user) {
            return res.json(new ApiResponse(404,"User not found"))
        }
        user.kycVerified = false;
        user.kycFilled = false;

        return res.json(new ApiResponse(200,"Kyc Declined"))

    }catch(err){
        return res.json(new ApiResponse(500,"something went wrong"))
    }



}

export {addKyc,getAllUnverifiedKyc,verifyKyc, declineKyc};
