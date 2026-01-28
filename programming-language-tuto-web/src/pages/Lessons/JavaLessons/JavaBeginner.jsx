import React, { useEffect, useState } from "react";
import LessonService from "../../../services/LessonService";
import Pagination from "../../../components/Pagination";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaBookmark } from 'react-icons/fa'; 


export default function JavaBeginner() {
  const pageSize = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [javaAdvance, setJavaAdvance] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedStatus, setSavedStatus] = useState({}); 
  const [statusLoading, setStatusLoading] = useState(true); 

  const fetchUserSavedStatus = async () => {
    try {
      const response = await LessonService.getSavedUserLessons(); 
      if (response.status === 200) {
        const savedLessonsData = response.data;
        const statusMap = {};
                savedLessonsData.forEach(item => {
          if (item.lesson && item.lesson.lessonId) {
            statusMap[item.lesson.lessonId] = 'saved';
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
      console.log(response)

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

        const beginnerLessons = lessons.filter(
          (lesson) =>
            lesson.lessonLevel &&
            lesson.lessonLevel.toLowerCase() === "beginner"
        );

        setJavaAdvance(beginnerLessons);
        setFilteredLessons(beginnerLessons);
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
    fetchPaginatedLessons(0);
    fetchUserSavedStatus();
  }, []); 

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = javaAdvance.filter(
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

  /**
   * Toggles the save/unsave status of a lesson for the authenticated user.
   * @param {number} lessonId The ID of the lesson to save/unsave.
   * @param {boolean} isCurrentlySaved True if the lesson is marked as saved in local state.
   */
  const handleToggleSaveLesson = async (lessonId, isCurrentlySaved) => {
    try {
      let response;
      let newStatus;

      if (isCurrentlySaved) {
        // UNSAVE ACTION
        response = await LessonService.unsaveUserLesson(lessonId);
        newStatus = 'unsaved';
      } else {
        // SAVE ACTION
        response = await LessonService.saveUserLesson(lessonId);
        newStatus = 'saved';
      }
      
      const message = response.data || "Lesson status updated.";
      
      if (response.status === 201 || response.status === 200) {
        setSavedStatus(prev => ({ ...prev, [lessonId]: newStatus }));
        
        if (newStatus === 'saved') {
          toast.success("✅ Lesson saved successfully!");
        } else if (newStatus === 'unsaved') {
          toast.info("🗑️ Lesson unsaved!");
        } else {
          toast.info("ℹ️ " + message);
        }
      } else {
        toast.error("Failed to update save status.");
      }
    } catch (error) {
      console.error("Error toggling save status:", error);
      const errorMessage = error.response?.data || "Could not update save status. Check network.";
      toast.error(`❌ ${errorMessage}`);
    }
  };


  if (loading || statusLoading) return <p className="text-center mt-10">Loading Java lessons and user status...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Java Beginner Lessons</h1>

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
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.lessonId}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-2xl p-4 transition-transform transform hover:-translate-y-1"
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
                  Level: <span className="font-semibold">{lesson.lessonLevel}</span>
                </p>

                <div className="flex space-x-2 items-center">
                    {/* TOGGLE Save/Unsave Button */}
                    <button
                        // Pass the current state to the toggle handler
                        onClick={() => handleToggleSaveLesson(lesson.lessonId, savedStatus[lesson.lessonId] === 'saved')}
                        className={`p-2 rounded-lg transition ${
                            savedStatus[lesson.lessonId] === 'saved' 
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600' // SAVED look (Bookmark filled)
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300' // UNSAVED look (Bookmark empty/gray)
                        }`}
                        title={savedStatus[lesson.lessonId] === 'saved' ? "Unsave Lesson" : "Save Lesson"}
                    >
                        <FaBookmark />
                    </button>
                    
                    {/* Existing Learn Button */}
                    <Link
                      to={`/lesson/${lesson.lessonId}`}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                    >
                      Learn
                    </Link>
                </div>
              </div>
            </div>
          ))}
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