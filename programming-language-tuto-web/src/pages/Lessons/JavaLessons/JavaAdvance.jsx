import React, { useEffect, useState } from "react";
import LessonService from "../../../services/LessonService";
import Pagination from "../../../components/Pagination";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa"; 

const PREREQUISITE_SCORE = 50;

export default function JavaAdvance() {
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [javaIntermediate, setJavaIntermediate] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [javaScore, setJavaScore] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [savedStatus, setSavedStatus] = useState({});
  const [statusLoading, setStatusLoading] = useState(true);

  const loadUserScore = () => {
    try {
      const storedMarksString = localStorage.getItem("subjectMarks");
      if (storedMarksString) {
        const subjectMarks = JSON.parse(storedMarksString);
        const score = subjectMarks.Java || 0;
        setJavaScore(score);

        const authorized = score >= PREREQUISITE_SCORE;
        setIsAuthorized(authorized);

        if (!authorized) {
          toast.warn(
            `Unlock intermediate by scoring at least ${PREREQUISITE_SCORE} in Beginner Java lessons.`
          );
        }
      } else {
        setIsAuthorized(false);
      }
    } catch (e) {
      console.error("Error loading subject marks:", e);
      setIsAuthorized(false);
    }
  };

  // ✅ Fetch user's saved lessons to mark them as saved
  const fetchUserSavedStatus = async () => {
    try {
      const response = await LessonService.getSavedUserLessons();
      if (response.status === 200) {
        const savedLessonsData = response.data;
        const statusMap = {};
        savedLessonsData.forEach((item) => {
          if (item.lesson && item.lesson.lessonId) {
            statusMap[item.lesson.lessonId] = "saved";
          }
        });
        setSavedStatus(statusMap);
      }
    } catch (error) {
      console.error("❌ Error fetching saved status:", error);
    } finally {
      setStatusLoading(false);
    }
  };

  const fetchPaginatedLessons = async (page = 0) => {
    try {
      const response = await LessonService.getJavaLessons(page, pageSize);
      if (response.status === 200) {
        const data = response.data;
        let lessons = [];

        if (data.content) {
          lessons = data.content;
          setTotalPages(data.totalPages);
        } else if (Array.isArray(data)) {
          lessons = data;
          setTotalPages(1);
        }

        const intermediateLessons = lessons.filter(
          (lesson) =>
            lesson.lessonLevel &&
            lesson.lessonLevel.toLowerCase() === "advanced"
        );

        setJavaIntermediate(intermediateLessons);
        setFilteredLessons(intermediateLessons);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("❌ Error fetching lessons:", error);
      setError("Failed to fetch lessons");
      toast.error("Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserScore();
    fetchPaginatedLessons(0);
    fetchUserSavedStatus();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = javaIntermediate.filter(
      (lesson) =>
        lesson.lessonTitle.toLowerCase().includes(term) ||
        lesson.lessonDescription.toLowerCase().includes(term)
    );
    setFilteredLessons(filtered);
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchPaginatedLessons(page);
    }
  };

  // ✅ Handle Locked Lesson Click
  const handleLockedClick = (e) => {
    if (!isAuthorized) {
      e.preventDefault();
      toast.error(
        `You need a Java score of ${PREREQUISITE_SCORE} to access Advance lessons. Current score: ${javaScore}`
      );
    }
  };

  // ✅ Save/Unsave Handler
  const handleToggleSaveLesson = async (lessonId, isCurrentlySaved) => {
    try {
      let response;
      let newStatus;

      if (isCurrentlySaved) {
        // Unsave
        response = await LessonService.unsaveUserLesson(lessonId);
        newStatus = "unsaved";
      } else {
        // Save
        response = await LessonService.saveUserLesson(lessonId);
        newStatus = "saved";
      }

      if (response.status === 200 || response.status === 201) {
        setSavedStatus((prev) => ({ ...prev, [lessonId]: newStatus }));

        if (newStatus === "saved") {
          toast.success("✅ Lesson saved successfully!");
        } else {
          toast.info("🗑️ Lesson unsaved!");
        }
      } else {
        toast.error("Failed to update save status.");
      }
    } catch (error) {
      console.error("Error toggling save status:", error);
      const errorMessage =
        error.response?.data || "Could not update save status. Check network.";
      toast.error(`❌ ${errorMessage}`);
    }
  };

  if (loading || statusLoading)
    return (
      <p className="text-center mt-10">
        Loading Java Advance lessons...
      </p>
    );

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Java Advance Lessons
        </h1>
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchTerm}
          onChange={handleSearch}
          className="mt-4 md:mt-0 w-full md:w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lesson Grid */}
      {filteredLessons.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.map((lesson) => {
            const isSaved = savedStatus[lesson.lessonId] === "saved";

            return (
              <div
                key={lesson.lessonId}
                className={`bg-white border border-gray-200 shadow-sm rounded-2xl p-4 transition-transform transform ${isAuthorized
                    ? "hover:shadow-md hover:-translate-y-1"
                    : "opacity-60 cursor-not-allowed"
                  }`}
              >
                <div className="overflow-hidden rounded-xl mb-3">
                  <img
                    src={`http://localhost:8080/lesson-images/${lesson.imageUrls}`}
                    alt={lesson.lessonTitle}
                    className="w-full h-40 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <h2 className="text-lg font-semibold text-gray-900">
                  {lesson.lessonTitle}
                </h2>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {lesson.lessonDescription}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm text-gray-500">
                    Level:{" "}
                    <span className="font-semibold">{lesson.lessonLevel}</span>
                  </p>

                  <div className="flex space-x-2 items-center">
                    {/* Save button - only if authorized */}
                    {isAuthorized && (
                      <button
                        onClick={() => handleToggleSaveLesson(lesson.lessonId, isSaved)}
                        className={`p-2 rounded-lg transition ${isSaved
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        title={isSaved ? "Unsave Lesson" : "Save Lesson"}
                      >
                        <FaBookmark />
                      </button>
                    )}

                    {/* Learn / Locked button */}
                    <Link
                      to={isAuthorized ? `/lesson/${lesson.lessonId}` : "#"}
                      onClick={handleLockedClick}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition ${isAuthorized
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                    >
                      {isAuthorized ? "Learn" : "Locked"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 mt-6 text-center">
          No lessons match your search.
        </p>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
