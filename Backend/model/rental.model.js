import mongoose from "mongoose";

const rentalSchema = mongoose.Schema({
  name: { type: String, required: true },
  images:[ 
    {
      type:String,required:true
    }, ],
  address: { type: String, required: true },
  description: { type: String, required: true },
  parentCategory: { type: String, required: true },
  subCategory: { type: String, required: true },
//   features: {
//     bathroom: { type: Boolean, default: false },
//     furnished: { type: Boolean, default: false },
//     parking: { type: Boolean, default: false },
//   },
  price: { type: Number, required: true },
  likedBy: {type: Number, default:1},
  createdAt: { type: Date, default: Date.now },
});
const Rental = mongoose.model("RentalInfo", rentalSchema);

export default Rental;