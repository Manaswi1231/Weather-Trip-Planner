import React, { createContext, useContext, useState } from "react";

const ItineraryContext = createContext();

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState([]);

  const addPlan = (place, notes) => {
    setItinerary([...itinerary, { place, notes }]);
  };

  return (
    <ItineraryContext.Provider value={{ itinerary, addPlan }}>
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => useContext(ItineraryContext);
