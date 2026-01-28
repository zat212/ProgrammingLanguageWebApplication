import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MainAdminAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        const filteredUsers = response.data.filter(
          (user) => user.userRole === "STUDENT" || user.userRole === "TUTOR"
        );
        setUsers(filteredUsers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await UserService.updateUserRole(userId, newRole);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, userRole: newRole } : user
        )
      );
      toast.success("Role updated successfully!", { position: "top-right", autoClose: 3000 });
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("❌ Failed to update role", { position: "top-right", autoClose: 3000 });
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading users...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        All Students & Tutors
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr className="text-center text-gray-700 uppercase text-sm">
              <th className="px-6 py-3 border-b">ID</th>
              <th className="px-6 py-3 border-b">First Name</th>
              <th className="px-6 py-3 border-b">Last Name</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((user, idx) => (
              <tr
                key={user.userId}
                className={`text-center text-gray-600 text-sm ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-6 py-3 border-b">{user.userId}</td>
                <td className="px-6 py-3 border-b">{user.firstName}</td>
                <td className="px-6 py-3 border-b">{user.lastName}</td>
                <td className="px-6 py-3 border-b">{user.email}</td>
                <td className="px-6 py-3 border-b font-semibold text-gray-800">
                  <select
                    value={user.userRole}
                    onChange={(e) =>
                      handleRoleChange(user.userId, e.target.value)
                    }
                    className="bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="TUTOR">TUTOR</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
