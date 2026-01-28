import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LessonService from "../../services/LessonService";
import SubjectService from "../../services/SubjectSerivce";

const EditLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonLevel, setLessonLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  // ✅ Fetch all subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await SubjectService.getAllSubjects();
        setSubjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubjects();
  }, []);

  // ✅ Fetch lesson by ID
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await LessonService.getLessonById(lessonId);
        const lesson = res.data;
        setLessonTitle(lesson.lessonTitle);
        setLessonDescription(lesson.lessonDescription);
        setLessonLevel(lesson.lessonLevel);
        setSubject(lesson.subject?.subjectId || "");
        setExistingImage(lesson.imageUrls || "");
      } catch (err) {
        console.error("❌ Error fetching lesson:", err);
      }
    };
    fetchLesson();
  }, [lessonId]);

  // ✅ Handle image
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      setExistingImage("");
    }
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const lessonData = {
        lessonTitle,
        lessonDescription,
        lessonLevel,
        subject: Number(subject),
        imageUrls: "",
      };

      formData.append(
        "lesson",
        new Blob([JSON.stringify(lessonData)], { type: "application/json" })
      );

      if (imageFile) formData.append("images", imageFile);

      await LessonService.updateLesson(lessonId, formData);
      toast.success("✅ Lesson updated successfully!");
      navigate(`/admin/addMaterials/${lessonId}`);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update lesson");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          ✏️ Edit Lesson
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lesson Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Lesson Title
            </label>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="Enter lesson title"
              required
            />
          </div>

          {/* Lesson Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              value={lessonDescription}
              onChange={(e) => setLessonDescription(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
              placeholder="Enter lesson description..."
              required
            ></textarea>
          </div>

          {/* Lesson Level */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Level
            </label>
            <select
              value={lessonLevel}
              onChange={(e) => setLessonLevel(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            >
              <option value="">-- Select Level --</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subject
            </label>
            <select
              value={subject || ""}
              onChange={(e) => setSubject(Number(e.target.value))}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            >
              <option value="">-- Select Subject --</option>
              {subjects.map((s) => (
                <option key={s.subjectId} value={s.subjectId}>
                  {s.subjectName}
                </option>
              ))}
            </select>
          </div>

          {/* Existing Image */}
          {existingImage && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Current Lesson Image
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:8080/lesson-images/${existingImage}`}
                  alt="Lesson"
                  className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                />
                <p className="text-sm text-gray-500">You can replace this image below.</p>
              </div>
            </div>
          )}

          {/* Upload New Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload New Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition transform hover:scale-[1.02]"
            >
              💾 Update Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLesson;
