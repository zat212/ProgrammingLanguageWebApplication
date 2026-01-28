import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainAdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await UserService.getAllUsers();
        const onlyStudents = response.data.filter(
          (user) => user.userRole === "STUDENT"
        );
        setStudents(onlyStudents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading students...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">All Students</h2>

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
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}

            {students.map((student, idx) => (
              <tr
                key={student.userId}
                className={`text-center text-gray-600 text-sm ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-6 py-3 border-b">{student.userId}</td>
                <td className="px-6 py-3 border-b">{student.firstName}</td>
                <td className="px-6 py-3 border-b">{student.lastName}</td>
                <td className="px-6 py-3 border-b">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}
