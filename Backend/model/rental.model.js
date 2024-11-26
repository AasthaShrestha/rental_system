import mongoose from "mongoose";

const rentalSchema = mongoose.Schema({
  name: String,
  title:String,
  price:Number,
  category:String,
  type:String,
  image:String,
});
const Rental = mongoose.model("RentalInfo", rentalSchema);

export default Rental;