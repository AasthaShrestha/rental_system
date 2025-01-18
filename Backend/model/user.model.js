import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    roles: {
      type: [String],
      enum: ["Admin", "Customer", "Super Admin"],
      default: "Customer",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [7, "Password must be at least 7 characters long"],
    },
    kycVerified:{
      type: Boolean,
      default: false
    },
    kycFilled:{
      type:Boolean,
      default:false
    },
    kycDetails: {
      idType: {
        type: String,
        required: false,
      },
      idNumber: {
        type: String,
        required: false,
        trim: true,
      },
      photoUrl:[{
        type: String,
        required:false
      }],
    }
  
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
