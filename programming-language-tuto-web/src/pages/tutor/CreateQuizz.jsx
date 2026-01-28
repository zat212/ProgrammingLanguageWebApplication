import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizzService from "../../services/QuizzService";

const CreateQuizz = () => {
  const { lessonId } = useParams();
  const [quizz, setQuizz] = useState([]);
  const [quizText, setQuizText] = useState("");
  const [quizType, setQuizType] = useState("");
  const [options, setOptions] = useState([
    { optionText: "", correct: false, explanation: "" },
  ]);

  const inputClass =
    "h-[50px] rounded-md border border-gray-300 w-full px-3 focus:ring-2 focus:ring-green-600 focus:outline-none";
  const textareaClass =
    "h-[80px] rounded-md border border-gray-300 w-full px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none";

  // ✅ Fetch quizzes for the lesson
  const fetchQuizz = async () => {
    try {
      const res = await QuizzService.getQuizzByLesson(lessonId);
      setQuizz(res.data);
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuizz();
  }, [lessonId]);

  // ✅ Delete quiz
  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await QuizzService.deleteQuizz(quizId);
      toast.success("Quiz deleted successfully!");
      fetchQuizz();
    } catch (err) {
      console.error("Error deleting quiz:", err);
      toast.error("Failed to delete quiz");
    }
  };

  // ✅ Add a new option
  const addOption = () => {
    setOptions([...options, { optionText: "", correct: false, explanation: "" }]);
  };

  // ✅ Remove an option
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  // ✅ Update option fields
  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  // ✅ Only one correct option
  const handleCorrectChange = (index) => {
    const updated = options.map((opt, i) => ({
      ...opt,
      correct: i === index,
    }));
    setOptions(updated);
  };

  // ✅ Submit quiz
  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizzData = {
      lessonId: Number(lessonId),
      quizText,
      quizType,
      options,
    };

    try {
      await QuizzService.createQuizz(quizzData);
      toast.success("Quiz created successfully!");
      setQuizText("");
      setQuizType("");
      setOptions([{ optionText: "", correct: false, explanation: "" }]);
      fetchQuizz();
    } catch (err) {
      console.error("Error creating quiz:", err);
      toast.error("Failed to create quiz");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow border border-gray-200">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        ➕ Create New Quiz
      </h2>

      {/* --- CREATE QUIZ FORM --- */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quiz Question */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Quiz Question
          </label>
          <textarea
            value={quizText}
            onChange={(e) => setQuizText(e.target.value)}
            placeholder="Enter your quiz question..."
            className={textareaClass}
            required
          />
        </div>

        {/* Quiz Type */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Quiz Type
          </label>
          <select
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
            className={inputClass}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True / False</option>
            <option value="short-answer">Short Answer</option>
          </select>
        </div>

        {/* Options */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Options
          </label>
          {options.map((opt, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg mb-4 bg-gray-50 space-y-3"
            >
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={opt.optionText}
                  onChange={(e) =>
                    handleOptionChange(index, "optionText", e.target.value)
                  }
                  className={inputClass}
                  required
                />
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={opt.correct}
                    onChange={() => handleCorrectChange(index)}
                  />
                  Correct
                </label>
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    🗑️
                  </button>
                )}
              </div>

              <textarea
                placeholder="Explanation (optional)"
                value={opt.explanation}
                onChange={(e) =>
                  handleOptionChange(index, "explanation", e.target.value)
                }
                className={textareaClass + " h-20"}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            ➕ Add Option
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-[#4D7C0F] text-white px-6 py-2 rounded-md hover:bg-[#3e630c] transition"
          >
            💾 Save Quiz
          </button>
        </div>
      </form>

      {/* --- QUIZ LIST TABLE --- */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          📋 Existing Quizzes
        </h3>

        {quizz.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No quizzes have been added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium">#</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Question</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Type</th>
                  <th className="py-3 px-4 text-center text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quizz.map((q, index) => (
                  <tr key={q.quizId} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-800">{q.quizText}</td>
                    <td className="py-3 px-4 text-gray-600 capitalize">
                      {q.quizType.replace("-", " ")}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteQuiz(q.quizId)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuizz;
