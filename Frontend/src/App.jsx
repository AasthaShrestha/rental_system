import React, { useState, useEffect, createContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a context for authUser
export const AuthUserContext = createContext();

const queryClient = new QueryClient();

// Get the authUser value from localStorage
const getValueFromLocalStorage = () => {
  const storedUser = localStorage.getItem("authUser");
    console.log("Stored User from LocalStorage:", storedUser);
  return storedUser ? JSON.parse(storedUser) : null;
};

function App() {
  // authUser state to store the authenticated user info
  const [authUser, setAuthUser] = useState(getValueFromLocalStorage);

  // Update localStorage whenever authUser changes
  useEffect(() => {
       console.log("Updating localStorage with authUser:", authUser);
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthUserContext.Provider>
  );
}

export default App;
