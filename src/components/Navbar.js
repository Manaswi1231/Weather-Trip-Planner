import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const displayName =
    typeof user === "string" ? user : user?.username || "Guest";

  return (
    <nav className="flex justify-between items-center bg-blue-600 p-4 text-white">
      <div className="text-xl font-semibold">
        <Link to="/">🌤️ Weather Trip Planner</Link>
      </div>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        <Link to="/places" className="hover:underline">
          Places
        </Link>

        <Link
          to="/favorites"
          className="text-white px-3 py-1 bg-blue-500 rounded hover:bg-blue-700"
        >
          View Favorites
        </Link>

        {user ? (
          <>
            <span className="font-semibold">Hi, {displayName}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
