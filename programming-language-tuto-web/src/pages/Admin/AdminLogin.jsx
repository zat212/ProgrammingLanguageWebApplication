import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save authentication data
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);

        navigate("/mainAdmin/allusers");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e7edf5]">
      <form
        onSubmit={handleLogin}
        className="w-[350px] h-[70vh] bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center"
      >
        {/* Logo */}
        <div className="w-20 h-20 bg-[#2c3e73] rounded-full flex items-center justify-center mb-6">
          <span className="text-white text-4xl">&#9679;&#9679;&#9679;</span>
        </div>

        {/* Email */}
        <div className="w-full mb-4 text-left">
          <label className="block text-sm text-gray-800 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Username@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none text-sm"
          />
        </div>

        {/* Password */}
        <div className="w-full mb-4 text-left">
          <label className="block text-sm text-gray-800 mb-1">Password</label>
          <input
            type="password"
            placeholder="●●●●●●●●●●●●"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none text-sm"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 mt-2 bg-[#2c3e73] text-white font-bold rounded-2xl hover:bg-[#1f2d52] transition-colors"
        >
          Login
        </button>

        {/* Footer Links */}
        <div className="w-full flex justify-between mt-4 text-sm">
          <a href="/adminRegister" className="text-[#2c3e73] hover:underline">
            Signup
          </a>
          <a href="#" className="text-[#2c3e73] hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
