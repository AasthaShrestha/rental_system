import mongoose from "mongoose"

export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://yatrikutiUsers:YatriKuti0723@cluster0.dea69.mongodb.net/rental_system?').then(()=>console.log("DB connected"));
}