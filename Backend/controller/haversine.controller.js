import Rental from "../model/rental.model.js";
import User from "../model/user.model.js";
import { calculateDistance } from "../utils/harversine.js";

export const getRentalsByDistance = async (req, res) => {
    try {
        const maxDistance=20;
        const user= await User.findOne({_id:req.user._id});
        const latitude=user.latitude;
        const longitude=user.longitude;
        

      // Fetch all rentals
      const rentals = await Rental.find();
  
      // Calculate distances
      const rentalsWithDistance = rentals.map((rental) => {
       
        const distance = calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          rental.latitude,
          rental.longitude,
        );
        // console.log("distance",distance);
        return { ...rental.toObject(), distance }; // Add distance to rental object
      });
     
  
      // Filter rentals within the maxDistance if provided
      const filteredRentals = maxDistance
        ? rentalsWithDistance.filter((rental) => rental.distance <= parseFloat(maxDistance))
        : rentalsWithDistance;

      // Respond with the filtered rentals
      res.status(200).json(filteredRentals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };