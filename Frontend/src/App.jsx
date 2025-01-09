import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
import { getAuth } from "firebase/auth";

function App() {
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid; // Firebase UID
        const email = user.email; // User email
        syncUserWithMongoDB(uid, email); // Function to sync user data
      }
    });
  }, []);

  const syncUserWithMongoDB = (uid, email) => {
    fetch("http://localhost:5000/combine-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, email }),  // Ensure you are passing data here
    })
      .then((res) => res.json())
      .then((data) => console.log("User synced:", data)) // Check this in the console
      .catch((error) => console.error("Error syncing user:", error));
  };
  

  return <RouterProvider router={router} />;
}

export default App;
