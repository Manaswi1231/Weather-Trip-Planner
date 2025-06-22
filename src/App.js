import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";
import RouteMapPage from "./pages/RouteMapPage";
import FavoritesList from "./components/FavoritesList";
import FavoritesPage from "./pages/FavoritesPage";
import ItineraryPlanner from "./components/ItineraryPlanner";
import ItineraryPage from "./pages/ItineraryPage";
import VisitingPlacesPage from "./pages/VisitingPlacesPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/route-map" element={<RouteMapPage />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/itinerary" element={<ItineraryPlanner />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/places" element={<VisitingPlacesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
