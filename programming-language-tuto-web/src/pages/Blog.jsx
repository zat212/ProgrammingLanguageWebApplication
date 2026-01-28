import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogService from "../services/BlogService";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await BlogService.getAllBlogs();
        setBlogs(res.data);
        setFilteredBlogs(res.data);
      } catch (err) {
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.blog_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.blog_description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Loading blogs...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-medium">
        {error}
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-14">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Inspiration Hub
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Explore articles, tutorials, and insights shared by our community.
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-12 px-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No matching blogs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.blog_id}
                className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Image */}
                {blog.imageUrls ? (
                  <img
                    src={`http://localhost:8080/blog-images/${blog.imageUrls}`}
                    alt={blog.blog_text}
                    className="w-full h-52 object-cover"
                  />
                ) : (
                  <div className="h-52 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-indigo-600 text-xs font-semibold uppercase mb-2">
                    Blog
                  </span>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {blog.blog_text}
                  </h3>

                  <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                    {blog.blog_description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-5 mt-auto">
                    <span>By Admin</span>
                    <span>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <Link
                    to={`/blogs/${blog.blog_id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
