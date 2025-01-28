import {axiosInstance} from './axiosInstance'

export const getRecommendedVehicle = async () => {
    try{
        const response = await axiosInstance.get("/api/suggest/vehicle?numberOfResult=3");
          return response.data;
    }
    catch (error) {
        throw error;
      }

}