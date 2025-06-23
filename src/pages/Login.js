import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        className="border p-2 w-full mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
