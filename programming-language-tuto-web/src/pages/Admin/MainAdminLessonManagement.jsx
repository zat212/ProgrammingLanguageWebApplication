import React, { useEffect, useState } from "react";
import LessonService from "../../services/LessonService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainAdminLessonManagement() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLessons, setFilteredLessons] = useState([]);

  const fetchLessons = async () => {
    try {
      const response = await LessonService.getAllDetailLesson();
      setLessons(response.data);
      setFilteredLessons(response.data);
    } catch (err) {
      console.error("❌ Error fetching lessons:", err);
      toast.error("Failed to load lessons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  // 🔍 Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = lessons.filter((lesson) =>
      lesson.lessonTitle.toLowerCase().includes(term) ||
      lesson.lessonDescription.toLowerCase().includes(term) ||
      lesson.lessonLevel.toLowerCase().includes(term) ||
      lesson.subject?.subjectName.toLowerCase().includes(term)
    );
    setFilteredLessons(filtered);
  }, [searchTerm, lessons]);

  // 🗑️ DELETE FUNCTION
  const handleDelete = async (lessonId) => {
    const confirm = window.confirm("Are you sure you want to delete this lesson?");
    if (!confirm) return;

    try {
      await LessonService.deleteLesson(lessonId);
      toast.success("Lesson deleted successfully!");
      fetchLessons(); // refresh data
    } catch (err) {
      console.error("❌ Delete error:", err);
      toast.error("Failed to delete. Some students might have saved this lesson.");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading lessons...</p>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <ToastContainer />

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📘 Lesson Management
      </h1>

      {/* Search Bar */}
      <div className="text-center mb-6">
        <input
          type="text"
          className="w-full max-w-md p-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400"
          placeholder="Search by title, subject, level, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredLessons.length === 0 ? (
        <p className="text-center text-gray-600">No lessons found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-600 text-white text-sm uppercase">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Level</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLessons.map((lesson) => (
                <tr
                  key={lesson.lessonId}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={`http://localhost:8080/lesson-images/${lesson.imageUrls}`}
                      alt={lesson.lessonTitle}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </td>

                  <td className="py-3 px-4 font-medium text-gray-800">
                    {lesson.lessonTitle}
                  </td>

                  <td className="py-3 px-4 text-gray-700">
                    {lesson.subject?.subjectName || "—"}
                  </td>

                  <td className="py-3 px-4 text-gray-700">
                    {lesson.lessonLevel}
                  </td>

                  <td className="py-3 px-4 text-gray-700 max-w-xs truncate">
                    {lesson.lessonDescription}
                  </td>

                  <td className="py-3 px-4 text-gray-500">
                    {new Date(lesson.created_at).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                      onClick={() => handleDelete(lesson.lessonId)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
