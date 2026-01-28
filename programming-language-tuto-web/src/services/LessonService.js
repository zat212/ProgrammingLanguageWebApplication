import api from "./api";

const LessonService = {
  getAllDetailLesson: () => api.get("/lessons"),
  getAllLessons: (page, size) => api.get(`/lessons/getallLesson?page=${page}&size=${size}`),
  getLessonById: (lessonId) => api.get(`/lessons/${lessonId}`),
  createLesson: (formData) => api.post("/lessons/createLesson", formData),
  updateLesson: (lessonId, data) => api.patch(`/lessons/${lessonId}`, data),
  deleteLesson: (lessonId) => api.delete(`/lessons/${lessonId}`),


  getJavaLessons: (page, size) => api.get(`/lessons/javaLessons?page=${page}&size=${size}`),
  getPythonLessons: (page, size) => api.get(`/lessons/pythonLessons?page=${page}&size=${size}`),
  getJavaScriptLessons: (page, size) => api.get(`/lessons/javaScriptLessons?page=${page}&size=${size}`),
  

  saveUserLesson: (lessonId) => api.post(`/lessons/${lessonId}/save`),
  unsaveUserLesson: (lessonId) => api.delete(`/lessons/${lessonId}/unsave`),
  getSavedUserLessons: () => api.get(`/lessons/saved`),
};

export default LessonService;
