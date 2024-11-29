import React, { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [rooms, setRooms] = useState([]);

  return (
    <DataContext.Provider value={{ vehicles, setVehicles, rooms, setRooms }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
