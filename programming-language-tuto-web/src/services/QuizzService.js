import api from "./api";

const QuizzService = {
  getAllQuizz: () => api.get("/quizzes"),
  getQuizzById: (id) => api.get(`/quizzes/${id}`),
  createQuizz: (quizzData) => api.post("/quizzes", quizzData),
  updateQuizz: (id, data) => api.put(`/quizzes/${id}`, data),
  deleteQuizz: (id) => api.delete(`/quizzes/${id}`),
  getQuizzByLesson : (lessonId) => api.get(`/quizzes/lesson/${lessonId}`),
  getQuizzOption : (quizId) => api.get(`/quizOpts/${quizId}`),
  saveQuizAttempt : (attemptData) => api.post("/quizzes/quizAttempts", attemptData),
  getAllQuizzAttempts : () => api.get("/quizzes/quizAttempts"),
};

export default QuizzService;
