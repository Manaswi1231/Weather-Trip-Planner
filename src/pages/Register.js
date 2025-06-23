import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl mb-4">Register Page (To Be Implemented)</h2>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Login
      </button>
    </div>
  );
};

export default Register;
