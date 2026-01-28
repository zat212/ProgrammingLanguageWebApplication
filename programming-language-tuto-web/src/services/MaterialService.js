import api from "./api";


const MaterialService = {
  getAllMaterial: () => api.get("/materials"),
  getMaterialById: (id) => api.get(`/materials/${id}`),
  getMaterialByLessonId : (lessonId) => api.get(`/materials/${lessonId}`),
  createMaterial: (formData) => api.post("/materials/createMaterial", formData),
  updateMaterial: (id, data) => api.patch(`/materials/${id}`, data),
  deleteMaterial: (materialId) => api.delete(`/materials/${materialId}`),
};

export default MaterialService;
