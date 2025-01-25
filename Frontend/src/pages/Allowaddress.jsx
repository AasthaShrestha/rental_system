import {useEffect, useState} from 'react';

function AllowAddress(){
    const[ipAddress,setIpAddress]=useState('');
    const[geoInfo,setGeoInfo]=useState({});
    useEffect(()=>{
        getVisitorIP();
    },[]);
    const getVisitorIP=async()=>{
        try {
            const response=await fetch('https://api.ipify.org');
            const data= await response.text();
            setIpAddress(data);
        } catch (error) {
            console.error('Failed to fetch IP:',error);
        }
    };
    // const handleInputChange=(e)=>{
    //     setIpAddress(e.target.value);
    // }
    const fetchIPInfo=async()=>{
       try {
        const response=await fetch(`http://ip-api.com/json/${ipAddress}`);
            const data= await response.json();
            setGeoInfo(data);
       } catch (error) {
        console.error('Failed to location info:',error);
       }
    }
    return(
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white rounded-lg shadow-lg w-96 p-6">
    <h2 className="text-lg font-bold text-gray-800">Allow Address Access</h2>
    <p className="text-gray-600 mt-2">We need your address to provide accurate service. Please allow access to continue.</p>
    <div className="mt-4 flex justify-end space-x-3">
      <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
      ☓
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" onClick={fetchIPInfo}>
      √
      </button>
    </div>
  </div>
</div>
    );
}
export default AllowAddress;