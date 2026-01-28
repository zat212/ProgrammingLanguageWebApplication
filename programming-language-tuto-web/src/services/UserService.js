import api from "./api";

const UserService = {
    getAllUsers: () => api.get("/users"),
    updateUserRole: (userId, newRole) =>
    api.put(`/users/${userId}/role?role=${newRole}`),

};



export default UserService; 