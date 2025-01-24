// SuccessPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/home');  // Redirect to the home page or a specific page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-green-100 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-green-800 mb-4">Payment Successful!</h1>
        <p className="text-lg text-green-700 mb-6">Your payment has been processed successfully. Thank you for your purchase!</p>
        <button
          onClick={handleRedirect}
          className="inline-block px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-500 transition duration-300"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
