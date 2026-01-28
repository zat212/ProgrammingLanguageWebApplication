import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
        // 1. Save core authentication data
        localStorage.setItem("token", data.jwt);
        console.log(data.jwt)
        console.log(data.email)
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);

        // 2. Save Subject Scores (NEW LOGIC)
        if (data.subjectScores) {
          // localStorage only stores strings, so convert the object to JSON string
          localStorage.setItem("subjectMarks", JSON.stringify(data.subjectScores));
          console.log("Subject marks saved:", data.subjectScores);
        } else {
          console.warn("No subjectScores found in the response data.");
        }

        // 3. Redirect based on role
        if (data.role === "STUDENT") {
          navigate("/home");
        } else if (data.role === "TUTOR") {
          navigate("/admin/lessonManagement");
        } else {
          alert("Unknown role");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Please sign in to your account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500"
                  required
                />
                {/* Toggle password visibility button can be implemented here */}
              </div>
            </div>

            {/* Remember me and forgot password */}
            

            {/* Sign In button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign In
            </button>
          </form>

          {/* Signup link */}
          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-red-600 hover:text-red-700"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;