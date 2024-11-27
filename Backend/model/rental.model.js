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
  features: {
    kitchen: { type: Boolean, default: false },
    bathroom: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
  },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Rental = mongoose.model("RentalInfo", rentalSchema);

export default Rental;