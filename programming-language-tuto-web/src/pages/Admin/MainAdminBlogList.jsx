import React, { useEffect, useState } from "react";
import BlogService from "../../services/BlogService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainAdminBlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
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

  // Delete blog
  const handleDelete = async (id) => {
    try {
      await BlogService.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.blog_id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  const handleEdit = (id) => {
    toast.info(`Edit blog with ID: ${id}`);
  };

  const filtered = blogs.filter((b) =>
    b.blog_text.toLowerCase().includes(search.toLowerCase()) ||
    b.blog_description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600 text-lg animate-pulse">
        Loading blogs...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          📰 Blog Management
        </h2>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-xl">
            <span className="absolute left-3 top-3 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-600 italic py-6">
            No blogs found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-600 text-white text-sm uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">Image</th>
                  <th className="px-6 py-3 text-left">Created At</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {filtered.map((blog, index) => (
                  <tr
                    key={blog.blog_id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {blog.blog_text}
                    </td>

                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                      {blog.blog_description}
                    </td>

                    <td className="px-6 py-4">
                      {blog.imageUrls ? (
                        <img
                          src={`http://localhost:8080/blog-images/${blog.imageUrls}`}
                          alt="Blog"
                          className="w-20 h-20 object-cover rounded-lg shadow-sm border border-gray-200"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(blog.created_at).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        onClick={() => handleEdit(blog.blog_id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm text-sm transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(blog.blog_id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-sm text-sm transition"
                      >
                        Delete
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
}
