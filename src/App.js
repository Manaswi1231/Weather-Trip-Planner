import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WeatherPage from "./pages/WeatherPage";
import RouteMapPage from "./pages/RouteMapPage";
import FavoritesPage from "./pages/FavoritesPage";
import VisitingPlacesPage from "./pages/VisitingPlacesPage";
import ItineraryPage from "./pages/ItineraryPage";

const App = () => {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname);

  return (
    <div>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/route-map" element={<RouteMapPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/places" element={<VisitingPlacesPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
      </Routes>
    </div>
  );
};

export default App;
