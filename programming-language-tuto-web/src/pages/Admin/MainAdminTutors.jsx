import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainAdminTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await UserService.getAllUsers();
        const onlyTutors = response.data.filter(
          (user) => user.userRole === "TUTOR"
        );
        setTutors(onlyTutors);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tutors:", err);
        setError("Failed to load tutors.");
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading tutors...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">All Tutors</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr className="text-center text-gray-700 uppercase text-sm">
              <th className="px-6 py-3 border-b">ID</th>
              <th className="px-6 py-3 border-b">First Name</th>
              <th className="px-6 py-3 border-b">Last Name</th>
              <th className="px-6 py-3 border-b">Email</th>
            </tr>
          </thead>

          <tbody>
            {tutors.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No tutors found.
                </td>
              </tr>
            )}

            {tutors.map((tutor, idx) => (
              <tr
                key={tutor.userId}
                className={`text-center text-gray-600 text-sm ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-6 py-3 border-b">{tutor.userId}</td>
                <td className="px-6 py-3 border-b">{tutor.firstName}</td>
                <td className="px-6 py-3 border-b">{tutor.lastName}</td>
                <td className="px-6 py-3 border-b">{tutor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}
