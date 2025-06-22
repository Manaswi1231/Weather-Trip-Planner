import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaCalendar } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white min-h-screen w-64">
      <h1 className="font-bold text-xl mb-8">Weather Trip Planner</h1>

      <div className="flex flex-col space-y-6">
        <Link to="/" className="flex items-center space-x-3 hover:underline">
          <FaHome />
          <span>Home</span>
        </Link>

        <Link
          to="/favorites"
          className="flex items-center space-x-3 hover:underline"
        >
          <FaHeart />
          <span>View Favorites</span>
        </Link>

        <Link
          to="/itinerary"
          className="flex items-center space-x-3 hover:underline"
        >
          <FaCalendar />
          <span>View Itinerary</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
