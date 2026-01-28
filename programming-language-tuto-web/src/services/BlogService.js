import api from "./api";

const BlogService = {
    getAllBlogs: () => api.get("/blog"),
    getBlogById: (blogId) => api.get(`/blog/${blogId}`),
    createBlog: (formData) => api.post("/blog/createBlog", formData),
    updateBlog: (blogId, data) => api.patch(`/blogs/${blogId}`, data),
    deleteBlog: (blogId) => api.delete(`/blog/${blogId}`),

};
export default BlogService;