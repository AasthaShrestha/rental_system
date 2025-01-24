// FailurePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FailurePage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/retry');  // Redirect to the retry page or previous step
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-red-100 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-red-800 mb-4">Payment Failed!</h1>
        <p className="text-lg text-red-700 mb-6">There was an issue processing your payment. Please try again.</p>
        <button
          onClick={handleRetry}
          className="inline-block px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-500 transition duration-300"
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default FailurePage;
