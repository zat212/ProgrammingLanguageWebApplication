import api from "./api";

const ProfileService = {
  getProfile: () => api.get("/profile"),
  getStudents: () => api.get("/profile/students"),
  updateProfile: (data) => api.put("/profile/update", data),
  uploadProfileImage: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/profile/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default ProfileService;
