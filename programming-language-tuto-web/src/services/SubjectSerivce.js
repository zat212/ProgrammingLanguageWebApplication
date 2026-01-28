import api from "./api";

const SubjectService = {
  getAllSubjects: () => api.get("/subject"),
  getSubjectById: (id) => api.get(`/subject/${id}`),
  createSubject: (data) => api.post("/subject", data),
  updateSubject: (id, data) => api.put(`/subject/${id}`, data),
  deleteSubject: (id) => api.delete(`/subject/${id}`),
};

export default SubjectService;
