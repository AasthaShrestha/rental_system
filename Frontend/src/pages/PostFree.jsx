import React, { useState, useRef } from "react";
import upload_icon from "../assets/upload_image.png";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import main0 from "../assets/main0.jpeg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";
import { axiosInstance } from "../api/axiosInstance";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function PostFree() {
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState(""); // Main category
  const [subcategory, setSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [latitude, setLatitude] = useState(null);  
  const [longitude, setLongitude] = useState(null);  
  const [mapCenter, setMapCenter] = useState({ lat: 27.7172, lng: 85.324 });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const subcategories = {
    "Real Estate": ["Single Room", "Double Room", "Flat", "House"],
    Vehicles: ["Bike", "Scooter", "Car", "E-Scooter"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productDescription || !price || !category || !subcategory || !address || !termsAccepted) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData(); 
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("parentCategory", category);
    formData.append("subCategory", subcategory);
    formData.append("latitude", latitude);  
    formData.append("longitude", longitude);

    // Append all images to the FormData
    file.forEach((image) => {
      formData.append(`images`, image); 
    });

    try {
      const response = await axiosInstance.post("api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Post submitted successfully!");
      console.log("Response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Error submitting post.");
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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDVsrErMhEQtr1gSWj0MyIGQzbkslWb4zY",
    libraries: ["places"],
    version: "weekly",
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLatitude(lat);
      setLongitude(lng);
      setAddress(place.formatted_address || "");
      setMapCenter({
        lat: lat,
        lng: lng,
      });
    }
  };

  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false); 

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div
        className="flex justify-center items-center p-6 bg-gray-100 min-h-screen"
        style={{
          backgroundImage: `url(${main0})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ToastContainer />
        <div className="w-full max-w-5xl bg-white border border-gray-300 rounded-lg shadow-lg p-6 relative">
          {/* Cross Arrow */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-gray-500 hover:text-pink-500 transition"
          >
            <FaTimes size={20} />
          </button>

          <form
            action="http://localhost:4001/api/posts"
            method="POST"
            enctype="multipart/form-data"
            className="flex flex-col md:flex-row gap-6"
          >
            {/* Left Side: Image Upload and Product Details */}
            <div className="w-full md:w-1/2 space-y-6">
              {/* Image Upload Section */}
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

              {/* Product Name */}
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                />
              </div>

              {/* Product Description */}
              <div>
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                />
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price (in Rs.)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                />
              </div>

              {/* Category Selection */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubCategory(""); // Reset subcategory when category is changed
                  }}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                >
                  <option value="" disabled={category !== ""}>
                    Select Category
                  </option>
                  {Object.keys(subcategories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Selection */}
              {category && (
                <div>
                  <label
                    htmlFor="subcategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subcategory
                  </label>
                  <select
                    id="subcategory"
                    value={subcategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                  >
                    <option value="" disabled={subcategory !== ""}>
                      Select Subcategory
                    </option>
                    {subcategories[category].map((subcat) => (
                      <option key={subcat} value={subcat}>
                        {subcat}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Right Side: Location */}
            <div className="w-full md:w-1/2 space-y-6">
              {/* Location */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <Autocomplete
                  onLoad={(autocomplete) =>
                    (autocompleteRef.current = autocomplete)
                  }
                  onPlaceChanged={handlePlaceSelect}
                >
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 mb-6"
                  />
                </Autocomplete>
              </div>

              <div className="mt-4">
                <GoogleMap
                  mapContainerStyle={{ height: "400px", width: "100%" }}
                  center={mapCenter}
                  zoom={15}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              </div>
            </div>
          </form>

          {/* Terms and Conditions */}
          <div className="mt-6 flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <button
                onClick={openModal}
                className="text-pink-500 underline"
              >
                terms and conditions
              </button>
            </label>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!termsAccepted}
            className={`w-full mt-6 py-3 rounded-lg transition ${
              termsAccepted
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Post
          </button>
        </div>
      </div>
      <Footer />

      {/* Terms and Conditions Modal */}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2 max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Terms and Conditions for Property Owners</h2>
            <div className="space-y-4">
              <p><strong>Eligibility</strong></p>
              <ul className="list-disc pl-5">
                <li>You must be at least 18 years old.</li>
                <li>You must be the property owner or have permission to list it.</li>
              </ul>

              <p><strong>Accurate Information</strong></p>
              <ul className="list-disc pl-5">
                <li>Provide accurate property details, including size, location, pricing, and clear photographs.</li>
                <li>Misrepresentation is prohibited.</li>
              </ul>

              <p><strong>Property Compliance</strong></p>
              <ul className="list-disc pl-5">
                <li>Ensure your property complies with all laws and regulations.</li>
                <li>Obtain necessary permits and licenses.</li>
              </ul>

              <p><strong>User Responsibilities</strong></p>
              <ul className="list-disc pl-5">
                <li>Respond promptly to inquiries.</li>
                <li>Honor agreements with renters or buyers.</li>
                <li>Update or remove outdated listings.</li>
              </ul>

              <p><strong>Prohibited Listings</strong></p>
              <ul className="list-disc pl-5">
                <li>Do not post illegal or misleading listings.</li>
                <li>Yatri Kuti reserves the right to remove non-compliant listings.</li>
              </ul>

              <p><strong>Fees and Payments</strong></p>
              <ul className="list-disc pl-5">
                <li>Listing fees will be stated when posting.</li>
                <li>You are responsible for applicable taxes on payments.</li>
              </ul>

              <p><strong>Content Ownership</strong></p>
              <ul className="list-disc pl-5">
                <li>You grant Yatri Kuti a non-exclusive, royalty-free license to use your listing for marketing purposes.</li>
              </ul>

              <p><strong>Liability</strong></p>
              <ul className="list-disc pl-5">
                <li>Yatri Kuti is not responsible for disputes between users and does not guarantee listing success.</li>
              </ul>

              <p><strong>Termination</strong></p>
              <ul className="list-disc pl-5">
                <li>Accounts may be suspended or terminated for violations.</li>
              </ul>

              <p><strong>Modification of Terms</strong></p>
              <ul className="list-disc pl-5">
                <li>We may update these terms at any time. Continued use signifies acceptance.</li>
              </ul>

              <p><strong>Governing Law</strong></p>
              <ul className="list-disc pl-5">
                <li>These terms are governed by the laws of [Your Jurisdiction].</li>
              </ul>

              <p><strong>Contact</strong></p>
              <ul className="list-disc pl-5">
                <li>Email: <a href="mailto:support@yatrikuti.com">support@yatrikuti.com</a></li>
                <li>Phone: +977 9865465747</li>
              </ul>

              <p className="mt-4">By posting your property, you acknowledge and accept these terms.</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostFree;
