import mongoose from "mongoose";
import {Schema} from 'mongoose';
const rentalSchema = mongoose.Schema({
  name: { type: String, required: true },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  address: { type: String, required: true },
  description: { type: String, required: true },
  parentCategory: { type: String, required: true },
  subCategory: { type: String, required: true },
  price: { type: Number, required: true },
  likedBy: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  occupied: {type:Boolean,default:false},
  orderId :{type:Schema.Types.ObjectId, ref:"Order"},
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
});

const Rental = mongoose.model("RentalInfo", rentalSchema);
export default Rental;
