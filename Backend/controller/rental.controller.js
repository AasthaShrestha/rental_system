import Rental from "../model/rental.model.js"

export const getRental = async (req,res)=> {
    try{
        const rental=await Rental.find()
        res.status(200).json(rental)
    }catch(error){
        console.log("Error:",error)
        res.status(200).json(error);
        
    }
}