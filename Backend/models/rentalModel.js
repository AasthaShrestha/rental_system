import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    
    name:{type:String,required: true},
    address:{type:String, required:true},
    category:{type:String, required:true},
    subcategory:{type:String, required:true},
    price:{type:Number, required:true},
})
const rentalModel=mongoose.models.Rent || mongoose.model("Rent",rentalSchema);

export default rentalModel;