import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LessonService from "../services/LessonService";
import QuizzService from "../services/QuizzService";


// The saveQuizAttempt is now correctly called from the imported QuizzService.
// We remove the local placeholder function to prevent confusion.


export default function LessonDetail() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [quizOptions, setQuizOptions] = useState({});
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  // *** studentIdentifier is no longer present in the frontend code. ***

  // Fetch lesson details
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await LessonService.getLessonById(lessonId);
        setLesson(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load lesson details");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [lessonId]);

  // Fetch quizzes + options
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizRes = await QuizzService.getQuizzByLesson(lessonId);
        setQuizzes(quizRes.data);

        const optionPromises = quizRes.data.map(async (quiz) => {
          const optRes = await QuizzService.getQuizzOption(quiz.quizId);
          return { quizId: quiz.quizId, options: optRes.data };
        });

        const resolvedOptions = await Promise.all(optionPromises);
        const optionMap = resolvedOptions.reduce((acc, curr) => {
          acc[curr.quizId] = curr.options;
          return acc;
        }, {});
        setQuizOptions(optionMap);
      } catch (err) {
        console.error(err);
        setError("Failed to load quizzes");
      }
    };
    fetchQuizzes();
  }, [lessonId]);

  // Handle answer selection
  const handleAnswerChange = (quizId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [quizId]: optionId,
    }));
  };

  // Check submitted answers, calculate score, and send to database
  const handleSubmit = async () => {
    const newResults = {};
    let correctCount = 0;
    const totalQuizzes = quizzes.length;

    quizzes.forEach((quiz) => {
      const selectedOptionId = answers[quiz.quizId];
      const correctOption = quizOptions[quiz.quizId]?.find((opt) => opt.correct === true);

      let isCorrect = false;

      if (correctOption) {
        isCorrect = correctOption.quizOptionId === selectedOptionId;
      }

      newResults[quiz.quizId] = isCorrect;

      if (isCorrect) {
        correctCount++;
      }
    });

    setResults(newResults);

    // --- Store Result in Database ---
    try {
      const attemptData = {
        // Only sending data needed for the backend to calculate the score/attempt
        lessonId: lessonId,
        totalQuizzes: totalQuizzes,
        correctAnswers: correctCount,
        attemptDate: new Date().toISOString(),
      };

      // Call the service function, which uses the API defined in QuizzService.js
      const res = await QuizzService.saveQuizAttempt(attemptData);
      console.log("Quiz attempt saved successfully:", res.data.message);

    } catch (err) {
      console.error("Failed to save quiz attempt:", err);
      setError("Quiz score calculated, but failed to save result to the database.");
    }
  };

  // Reset answers
  const handleReset = () => {
    setAnswers({});
    setResults({});
    setError("");
  };

  // UI feedback
  if (loading) return <p className="text-center mt-10">Loading lesson details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!lesson) return <p className="text-center mt-10">No lesson data found.</p>;

  // Calculate score for display
  const currentScore = Object.values(results).filter(r => r).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ===== LESSON HEADER ===== */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {lesson.lessonTitle}
          </h1>
          <p className="text-gray-700 leading-relaxed">{lesson.lessonDescription}</p>

          <div className="mt-3 text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Level:</span> {lesson.lessonLevel}
            </p>
            {lesson.subject && (
              <p>
                <span className="font-medium">Subject:</span> {lesson.subject.subjectName}
              </p>
            )}
          </div>
        </div>

        {lesson.imageUrls && (
          <img
            src={`http://localhost:8080/lesson-images/${lesson.imageUrls}`}
            alt="Lesson"
            className="w-60 h-40 object-cover rounded-xl shadow-md mt-6 md:mt-0 border"
          />
        )}
      </div>

      {/* ===== LEARNING MATERIALS ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-l-4 border-indigo-500 pl-3">
          Learning Materials
        </h2>

        {lesson.learningMaterials && lesson.learningMaterials.length > 0 ? (
          <ul className="space-y-6">
            {lesson.learningMaterials.map((material) => (
              <li key={material.materialId} className="p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-900">{material.materialTitle}</h3>
                <p className="text-gray-600 mt-2">{material.description}</p>
                <p className="text-md text-gray-500 mt-1">
                  <p className="text-gray-600 mt-2">{material.content}</p>
                  Type: <span className="font-medium">{material.materialType}</span>
                </p>

                {material.materialType === "Photo" && material.materialUrl && (
                  <img
                    src={`http://localhost:8080${material.materialUrl}`}
                    alt={material.materialTitle}
                    className="w-full md:w-2/3 rounded-lg mt-4 shadow-sm border block mx-auto"
                  />
                )}

                {material.materialType !== "Photo" && material.materialUrl && (
                  <a
                    href={`http://localhost:8080${material.materialUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 mt-3 inline-block font-medium"
                  >
                    Download Material
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No materials found for this lesson.</p>
        )}
      </section>

      {/* ===== QUIZZES SECTION ===== */}
      <section>
        <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-l-4 border-indigo-500 pl-3">
          Lesson Quizzes
        </h2>

        {/* Display Final Score (if submitted) */}
        {Object.keys(results).length > 0 && (
          <div className="p-4 mb-6 bg-indigo-100 border-l-4 border-indigo-600 text-indigo-800 font-bold rounded-lg shadow-md">
            Your Score: {currentScore} / {quizzes.length} Correct Answers 🎉
          </div>
        )}

        {quizzes.length > 0 ? (
          <ul className="space-y-6">
            {quizzes.map((quiz) => (
              <li key={quiz.quizId} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-900"> {quiz.quizText}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Type: <span className="font-medium">{quiz.quizType}</span>
                </p>

                {/* Options */}
                {quizOptions[quiz.quizId] && quizOptions[quiz.quizId].length > 0 ? (
                  <ul className="mt-3 ml-4 space-y-3">
                    {quizOptions[quiz.quizId].map((opt) => {
                      const isSelected = answers[quiz.quizId] === opt.quizOptionId;
                      const isCorrect = opt.correct === true;
                      const isSubmitted = results[quiz.quizId] !== undefined;

                      const style = isSubmitted
                        ? isCorrect
                          ? "border-green-500 bg-green-50"
                          : isSelected
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200"
                        : "border-gray-200";

                      return (
                        <li
                          key={opt.quizOptionId}
                          className={`p-3 border rounded-lg ${style} transition-all duration-200`}
                        >
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`quiz-${quiz.quizId}`}
                              value={opt.quizOptionId}
                              onChange={() => handleAnswerChange(quiz.quizId, opt.quizOptionId)}
                              className="mr-2 accent-indigo-600"
                              disabled={isSubmitted}
                            />
                            <span className="text-gray-800">{opt.optionText}</span>
                          </label>

                          {isSubmitted && (
                            <p
                              className={`text-sm mt-2 ml-6 ${isCorrect ? "text-green-600" : "text-gray-500"
                                }`}
                            >
                              {opt.explanation}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-2">No options available.</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No quizzes available for this lesson.</p>
        )}

        {/* Buttons */}
        {quizzes.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={handleSubmit}
              disabled={Object.keys(results).length > 0}
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {Object.keys(results).length > 0 ? 'Answers Submitted' : 'Submit Answers'}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition"
            >
              Reset
            </button>
          </div>
        )}
      </section>
    </div>
  );
}