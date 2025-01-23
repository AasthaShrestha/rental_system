import React, { useState } from "react";
import main0 from "../assets/main0.jpeg";
import upload_icon from "../assets/upload_image.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";
import { axiosInstance } from "../api/axiosInstance";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Kyc = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(""); // Main category
  const [idNumber, setIdNumber] = useState(""); // Replaced productName with idNumber
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("idNumber", idNumber); // Use idNumber here
    formData.append("idType", category);
    file.forEach((image) => {
      formData.append(`images`, image);
    });

    try {
      const response = await axiosInstance.post("user/addkyc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("KYC submitted successfully!");
      console.log("Response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Error submitting KYC.");
    }
  };

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (uploadedFiles.length > 0) {
      setFile(uploadedFiles);
      uploadedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prevImages) => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url(${main0})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <ToastContainer />
        <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg p-6 relative">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-gray-500 hover:text-pink-500 transition"
          >
            <FaTimes size={20} />
          </button>

          <form method="POST" className="flex flex-col space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              {images.map((image, index) => (
                <div key={index} className="w-24 h-24">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 cursor-pointer hover:border-gray-400"
              >
                <img src={upload_icon} alt="Add" className="w-10 h-10 mb-2" />
                <span className="text-sm">Add Image</span>
                <input
                  type="file"
                  id="image"
                  name="images"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                ID Type
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
              >
                <option value="" disabled={category !== ""}>
                  Select ID Type
                </option>
                <option value="Citizenship">Citizenship</option>
                <option value="Passport">Passport</option>
                <option value="Driving Liscence">Driving Liscence</option>
                <option value="National ID">National ID</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium text-gray-700"
              >
                ID Number
              </label>
              <input
                type="text"
                id="idNumber"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>

            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="mt-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Kyc;
