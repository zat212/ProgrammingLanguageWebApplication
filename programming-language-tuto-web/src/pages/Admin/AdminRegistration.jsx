import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const REGISTER_URL = "http://localhost:8080/auth/signup";

export default function AdminRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: "ADMIN",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(REGISTER_URL, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        localStorage.setItem("jwt", response.data.jwt);
        navigate("/adminLogin");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }

    console.log("Registration Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e7edf5]">
      <form
        onSubmit={handleRegister}
        className="w-[350px] bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center"
      >
        {/* Logo */}
        <div className="w-20 h-20 bg-[#2c3e73] rounded-full flex items-center justify-center mb-6">
          <span className="text-white text-4xl">&#9679;&#9679;&#9679;</span>
        </div>

        <h2 className="text-gray-800 text-2xl font-bold mb-6">Admin Registration</h2>

        {error && (
          <p className="w-full mb-4 text-red-600 text-sm text-center">{error}</p>
        )}

        {/* First Name */}
        <div className="w-full mb-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none text-sm"
          />
        </div>

        {/* Last Name */}
        <div className="w-full mb-3">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none text-sm"
          />
        </div>

        {/* Email */}
        <div className="w-full mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none text-sm"
          />
        </div>

        {/* Password */}
        <div className="w-full mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none text-sm"
          />
        </div>

        {/* Confirm Password */}
        <div className="w-full mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none text-sm"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-2 mt-2 bg-[#2c3e73] text-white font-bold rounded-2xl hover:bg-[#1f2d52] transition-colors"
        >
          Register
        </button>

        {/* Footer Link */}
        <div className="w-full flex justify-center mt-4 text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/adminLogin" className="ml-1 text-[#2c3e73] hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
