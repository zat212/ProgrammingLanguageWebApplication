import React, { useEffect, useState } from "react";
import QuizzService from "../../services/QuizzService";

export default function CheckQuizAttempt() {
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [filteredAttempts, setFilteredAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchQuizAttempts = async () => {
    try {
      const response = await QuizzService.getAllQuizzAttempts();
      setQuizAttempts(response.data);
      setFilteredAttempts(response.data);
      console.log("✅ Quiz Attempts fetched:", response.data);
    } catch (error) {
      console.error("❌ Error fetching quiz attempts:", error);
      setError("Failed to fetch quiz attempts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizAttempts();
  }, []);

  // Handle search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = quizAttempts.filter((attempt) => {
      const studentName = `${attempt.user?.firstName || ""} ${attempt.user?.lastName || ""}`.toLowerCase();
      const subject = attempt.lesson?.subject?.toLowerCase() || "";
      return studentName.includes(value) || subject.includes(value);
    });

    setFilteredAttempts(filtered);
  };

  if (loading)
    return <p className="text-center text-gray-600 mt-10 text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10 text-lg">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        🎯 Quiz Attempts Overview
      </h2>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by student name"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Attempt ID</th>
              <th className="py-3 px-4 text-left font-semibold">Student Name</th>
              <th className="py-3 px-4 text-left font-semibold">Lesson ID</th>
              <th className="py-3 px-4 text-left font-semibold">Total Quizzes</th>
              <th className="py-3 px-4 text-left font-semibold">Correct Answers</th>
              <th className="py-3 px-4 text-left font-semibold">Score (%)</th>
              <th className="py-3 px-4 text-left font-semibold">Attempt Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttempts.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No quiz attempts found.
                </td>
              </tr>
            ) : (
              filteredAttempts.map((attempt, index) => (
                <tr
                  key={attempt.attemptId}
                  className={`transition duration-200 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50`}
                >
                  <td className="py-3 px-4 border-b">{attempt.attemptId}</td>
                  <td className="py-3 px-4 border-b font-medium text-gray-800">
                    {attempt.user?.firstName} {attempt.user?.lastName}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-600">
                    {attempt.lessonId}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-600">
                    {attempt.totalQuizzes}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-600">
                    {attempt.correctAnswers}
                  </td>
                  <td
                    className={`py-3 px-4 border-b font-semibold ${
                      (attempt.correctAnswers / attempt.totalQuizzes) * 100 >= 50
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {((attempt.correctAnswers / attempt.totalQuizzes) * 100).toFixed(0)}%
                  </td>
                  <td className="py-3 px-4 border-b text-gray-500">
                    {new Date(attempt.attemptDate).toLocaleString()}
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
