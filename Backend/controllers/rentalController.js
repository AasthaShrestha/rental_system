import { response } from "express";
import rentalModel from "../models/rentalModel.js";
import fs from 'fs'

//Post for free
const addProduct= async(req,res)=>{
    //let image_filename=`${req.file.filename}`;
    console.log("Parsed Request Body:", req.body); 

    const rent=new rentalModel({
        name:req.body.name,
        address:req.body.address,
        category:req.body.category,
        subcategory:req.body.subcategory,
        price:req.body.price
    })
    try{
        await rent.save();
        res.json({success:true,message:"Product Added"})
    }
    catch(error){
        console.log(error)
        res.status(400).json({success:false,message:"Error"})
    }

}
export {addProduct}