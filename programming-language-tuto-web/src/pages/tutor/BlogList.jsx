import React from "react";
import BlogService from "../../services/BlogService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogList() {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await BlogService.getAllBlogs();
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs.");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {

    try {
      await BlogService.deleteBlog(id);
      setBlogs(blogs.filter((b) => b.blog_id !== id));
      toast.success("✅ Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("❌ Failed to delete blog.");
    }
  };

  const handleEdit = (id) => {
    // You can navigate to EditBlog page if you have it, for example:
    // navigate(`/admin/blogs/edit/${id}`);
    toast.info(`✏️ Edit blog with ID: ${id}`);
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">Loading blogs...</div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          📚 Blog List
        </h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Created At</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr
                    key={blog.blog_id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {blog.blog_text}
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                      {blog.blog_description}
                    </td>
                    <td className="py-3 px-4">
                      {blog.imageUrls ? (
                        <img
                          src={`http://localhost:8080/blog-images/${blog.imageUrls}`}
                          alt="blog"
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(blog.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleEdit(blog.blog_id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(blog.blog_id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </div>
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
}
