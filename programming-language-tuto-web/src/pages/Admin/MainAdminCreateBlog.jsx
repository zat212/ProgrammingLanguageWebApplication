import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BlogService from "../../services/BlogService";

export default function MainAdminCreateBlog() {
  const navigate = useNavigate();

  const [imageFiles, setImageFiles] = useState([]);
  const [blogText, setBlogText] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleBlogImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const blogData = {
        blogText,
        blogDescription,
      };

      formData.append(
        "blog",
        new Blob([JSON.stringify(blogData)], { type: "application/json" })
      );

      imageFiles.forEach((file) => formData.append("images", file));

      const res = await BlogService.createBlog(formData);

      if (res.status === 201) {
        toast.success("✅ Blog created successfully!");

        // Reset state
        setBlogText("");
        setBlogDescription("");
        setImageFiles([]);

        // Reset file input
        setFileInputKey((prev) => prev + 1);

        // Navigate back to admin blog management
        navigate("/mainAdmin/allBlogs");
      }
    } catch (error) {
      console.error("❌ Error creating blog:", error);
      toast.error("❌ Failed to create blog.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          📝 Create New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={blogText}
              onChange={(e) => setBlogText(e.target.value)}
              placeholder="Enter blog title..."
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Blog Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Blog Description
            </label>
            <textarea
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
              placeholder="Write the blog description..."
              rows="5"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Upload Images */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Images
            </label>

            <input
              key={fileInputKey}
              type="file"
              multiple
              accept="image/*"
              onChange={handleBlogImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />

            {/* Image preview */}
            {imageFiles.length > 0 && (
              <div className="mt-4 flex gap-3 flex-wrap">
                {imageFiles.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-lg border shadow"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
