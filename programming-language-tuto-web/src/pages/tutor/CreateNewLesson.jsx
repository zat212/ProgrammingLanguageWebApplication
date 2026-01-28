import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LessonService from "../../services/LessonService";
import SubjectService from "../../services/SubjectSerivce";

const CreateNewLesson = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonLevel, setLessonLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await SubjectService.getAllSubjects();
        setSubjects(response.data);
      } catch (error) {
        console.error("❌ Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleLessonImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      const lessonData = {
        lessonTitle,
        lessonDescription,
        lessonLevel,
        subject: Number(subject),
      };

      formData.append(
        "lesson",
        new Blob([JSON.stringify(lessonData)], { type: "application/json" })
      );

      imageFiles.forEach((file) => formData.append("images", file));

      const res = await LessonService.createLesson(formData);

      if (res.status === 201) {
        const lessonId = res.data;
        toast.success("✅ Lesson created successfully!");
        navigate(`/admin/addMaterials/${lessonId}`);

        setLessonTitle("");
        setLessonDescription("");
        setLessonLevel("");
        setSubject("");
        setImageFiles([]);
        e.target.reset();
      }
    } catch (error) {
      console.error("❌ Error submitting lesson:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to create lesson.";
      toast.error(`❌ ${errorMsg}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 md:px-6 lg:px-8">
      <ToastContainer />

      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          📘 Create New Lesson
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Lesson Title
            </label>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="Enter lesson title"
              className="w-full h-[48px] px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Description
            </label>
            <textarea
              value={lessonDescription}
              onChange={(e) => setLessonDescription(e.target.value)}
              placeholder="Enter lesson description"
              className="w-full min-h-[90px] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Level
              </label>
              <select
                value={lessonLevel}
                onChange={(e) => setLessonLevel(e.target.value)}
                className="w-full h-[48px] px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                required
              >
                <option value="">-- Select Level --</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Subject
              </label>
              <select
                value={subject || ""}
                onChange={(e) => setSubject(Number(e.target.value))}
                className="w-full h-[48px] px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                required
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((subj) => (
                  <option key={subj.subjectId} value={subj.subjectId}>
                    {subj.subjectName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Lesson Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleLessonImageChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
            />
            {imageFiles.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                {imageFiles.length} file(s) selected
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-all duration-200 shadow-md"
            >
              Create Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewLesson;
