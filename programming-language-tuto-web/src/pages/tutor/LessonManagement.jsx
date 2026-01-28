import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import LessonService from '../../services/LessonService';


export default function LessonManagement() {
    const [lessonData, setLessonData] = useState([]);
    const [filteredLessons, setFilteredLessons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const fetchLessons = async () => {
        try {
            const response = await LessonService.getAllDetailLesson();
            setLessonData(response.data);
            setFilteredLessons(response.data); // initialize filtered
            console.log("✅ Lessons fetched:", response.data);
        } catch (error) {
            console.error("❌ Error fetching data:", error);
            setError("Failed to fetch lessons");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    // ✅ Handle search filter
    useEffect(() => {
        const filtered = lessonData.filter((lesson) => {
            const term = searchTerm.toLowerCase();
            return (
                lesson.lessonTitle.toLowerCase().includes(term) ||
                lesson.lessonDescription.toLowerCase().includes(term) ||
                lesson.subject?.subjectName.toLowerCase().includes(term) ||
                lesson.lessonLevel.toLowerCase().includes(term)
            );
        });
        setFilteredLessons(filtered);
    }, [searchTerm, lessonData]);

    const handleDelete = async (lessonId) => {
        if (!window.confirm("Are you sure you want to delete this lesson?")) return;
        try {
            await LessonService.deleteLesson(lessonId);
            toast.success("🗑️ Lesson deleted successfully!");
            fetchLessons(); // refresh table
        } catch (err) {
            console.error("❌ Error deleting lesson:", err);
            toast.error("Some Students saved this Lesson Failed to delete lesson");
        }
    };

    if (loading)
        return <p className="text-center mt-10 text-gray-500">Loading lessons...</p>;
    if (error)
        return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                📘 All Lessons
            </h1>

            {/* 🔍 Search Box */}
            <div className="mb-6 text-center">
                <input
                    type="text"
                    placeholder="Search by title, subject, level, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border w-full max-w-md p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            {filteredLessons.length === 0 ? (
                <p className="text-center text-gray-600">No lessons found.</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-xl bg-white">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-blue-600 text-white text-sm">
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
                                            className="w-16 h-16 object-cover rounded-md border"
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
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
                                                onClick={() => navigate(`/admin/editLesson/${lesson.lessonId}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                                                onClick={() => handleDelete(lesson.lessonId)}
                                            >
                                                Delete
                                            </button>
                                        </div>
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
