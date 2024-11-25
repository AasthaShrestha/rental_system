import express from "express"
import cors from "cors"
import {connectDB} from "./config/db.js"
import rentalRouter from "./routes/rentalRoutes.js"

//app config

const app=express()
const port=4000

//middleware
app.use(express.json())//using this middleware whenever we will get request from the frontend to backend that will be parse using the json
app.use(express.urlencoded({ extended: true }));

app.use(cors())


//db connection
connectDB();

//api endpoints
app.use("/api/Rent",rentalRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://yatrikutiUsers:<db_password>@cluster0.dea69.mongodb.net/?