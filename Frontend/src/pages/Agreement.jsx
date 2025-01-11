import React, { useState } from "react";
import axios from "axios";

const EncodeForm = () => {
    const [text, setText] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleEncode = async () => {
        try {
            setError(null); // Clear previous errors
            const res = await axios.post("http://localhost:5000/api/encode", { text });
            setResponse(res.data);
        } catch (err) {
            setError("Failed to encode data. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Encode Data</h2>
                <input
                    type="text"
                    placeholder="Enter text to encode"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleEncode}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Encode
                </button>
                {error && (
                    <p className="mt-4 text-sm text-red-500">{error}</p>
                )}
                {response && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-md shadow">
                        <h3 className="text-lg font-semibold text-gray-700">Response:</h3>
                        <p className="text-sm text-gray-600">
                            <strong>Original Text:</strong> {response.data.originalText}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Encoded Text:</strong> {response.data.encodedText}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EncodeForm;
