import React, { useEffect, useState } from "react";
import ProfileService from "../../services/ProfileService";

export default function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await ProfileService.getStudents();
                setStudents(response.data);
                setFilteredStudents(response.data);
                console.log("✅ Students fetched:", response.data);
            } catch (error) {
                console.error("❌ Error fetching students:", error);
                setError("Failed to fetch students");
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    // 🔍 Handle Search
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = students.filter((student) => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            const userClass = student.userClass?.toLowerCase() || "";
            return fullName.includes(value) || userClass.includes(value);
        });
        setFilteredStudents(filtered);
    };

    if (loading)
        return <p className="text-center text-gray-600 mt-10 text-lg">Loading...</p>;
    if (error)
        return <p className="text-center text-red-500 mt-10 text-lg">{error}</p>;

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                🎓 Student Management
            </h2>

            {/* 🔍 Search Bar */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by name or class..."
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* 🧾 Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold">#</th>
                            <th className="py-3 px-4 text-left font-semibold">Profile</th>
                            <th className="py-3 px-4 text-left font-semibold">Name</th>
                            <th className="py-3 px-4 text-left font-semibold">Email</th>
                            <th className="py-3 px-4 text-left font-semibold">Class</th>
                            <th className="py-3 px-4 text-left font-semibold">Phone</th>
                            <th className="py-3 px-4 text-left font-semibold">Saved Lessons</th>
                            <th className="py-3 px-4 text-left font-semibold">Joined At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500 italic">
                                    No students found.
                                </td>
                            </tr>
                        ) : (
                            filteredStudents.map((student, index) => (
                                <tr
                                    key={student.userId}
                                    className={`transition duration-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-blue-50`}
                                >
                                    <td className="py-3 px-4 border-b text-gray-600">
                                        {index + 1}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        <img
                                            src={`http://localhost:8080/uploads/profiles/${student.profileImageUrl}`}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                    </td>
                                    <td className="py-3 px-4 border-b font-medium text-gray-800">
                                        {student.firstName} {student.lastName}
                                    </td>
                                    <td className="py-3 px-4 border-b text-gray-600">
                                        {student.email}
                                    </td>
                                    <td className="py-3 px-4 border-b text-gray-600">
                                        {student.userClass}
                                    </td>
                                    <td className="py-3 px-4 border-b text-gray-600">
                                        {student.phoneNumber}
                                    </td>
                                    <td className="py-3 px-4 border-b text-center text-gray-800 font-semibold">
                                        {student.savedLessons?.length || 0}
                                    </td>
                                    <td className="py-3 px-4 border-b text-gray-500">
                                        {new Date(student.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
