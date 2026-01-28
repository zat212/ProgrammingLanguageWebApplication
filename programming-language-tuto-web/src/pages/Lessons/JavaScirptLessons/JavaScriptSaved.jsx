import React, { useEffect, useState } from "react";
import LessonService from "../../../services/LessonService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaBookmark } from "react-icons/fa";

export default function JavaScriptSaved() {
  const [savedLessons, setSavedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSavedLessons = async () => {
    setLoading(true);
    try {
      const response = await LessonService.getSavedUserLessons();
      if (response.status === 200) {
        setSavedLessons(response.data);
        console.log("Fetched saved lessons data:", response.data);
      }
    } catch (error) {
      console.error("❌ Error fetching saved lessons:", error);
      setError("Failed to fetch saved lessons. Please log in.");
      toast.error("Failed to fetch saved lessons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedLessons();
  }, []);

  const handleUnsaveLesson = async (lessonId) => {
    try {
      const response = await LessonService.unsaveUserLesson(lessonId);
      if (response.status === 200) {
        toast.info("🗑️ Lesson unsaved successfully!");
        setSavedLessons((prev) =>
          prev.filter(
            (saved) => saved.lesson && saved.lesson.lessonId !== lessonId
          )
        );
      } else {
        toast.error("Failed to unsave lesson.");
      }
    } catch (error) {
      console.error("Error unsaving lesson:", error);
      toast.error("Could not unsave lesson.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading saved lessons...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-8">
        <FaBookmark className="text-3xl text-yellow-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">My Saved JavaScript Lessons</h1>
      </div>

      {savedLessons.filter(item => item.lesson?.subject?.subjectName === "JavaScript").length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600">You haven't saved any Java lessons yet.</p>
          <p className="mt-2 text-gray-500">
            Find Java lessons on the main page to save them here!
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedLessons
            .filter(savedItem => savedItem.lesson?.subject?.subjectName === "JavaScript")
            .map((savedItem, index) => {
              const lesson = savedItem.lesson;
              if (!lesson || !lesson.lessonId) {
                console.warn(`Skipping malformed saved lesson item at index ${index}.`);
                return null;
              }

              return (
                <div
                  key={lesson.lessonId}
                  className="bg-white border border-yellow-300 shadow-md rounded-2xl p-4 transition-transform transform hover:-translate-y-1"
                >
                  <div className="overflow-hidden rounded-xl mb-3">
                    <img
                      src={`http://localhost:8080/lesson-images/${lesson.imageUrls}`}
                      alt={lesson.lessonTitle}
                      className="w-full h-40 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {lesson.lessonTitle}
                  </h2>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {lesson.lessonDescription}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-gray-500">
                      Level: <span className="font-semibold">{lesson.lessonLevel}</span>
                    </p>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUnsaveLesson(lesson.lessonId)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        title="Remove from Saved"
                      >
                        <FaTrashAlt />
                      </button>

                      <Link
                        to={`/lesson/${lesson.lessonId}`}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                      >
                        Learn
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
