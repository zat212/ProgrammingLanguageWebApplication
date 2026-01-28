import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BlogService from "../../services/BlogService"; 

export default function CreateBlog() {
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
                navigate("/admin/lessonManagement");

                setBlogText("");
                setBlogDescription("");
                setImageFiles([]);
                
                setFileInputKey(prevKey => prevKey + 1); 
            }
        } catch (error) {
            console.error("❌ Error creating blog:", error);
            toast.error("❌ Failed to create blog.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    📝 Create a New Blog
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Blog Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter blog title..."
                            value={blogText}
                            onChange={(e) => setBlogText(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Blog Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Blog Description
                        </label>
                        <textarea
                            placeholder="Write your blog content here..."
                            value={blogDescription}
                            onChange={(e) => setBlogDescription(e.target.value)}
                            rows="5"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        ></textarea>
                    </div>

                    {/* Upload Images */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Images
                        </label>
                        <input
                            key={fileInputKey} // ⭐ Guaranteed reset on key change
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleBlogImageChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

                        {/* Preview selected images */}
                        {imageFiles.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                                {imageFiles.map((file, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
                        >
                            Create Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}