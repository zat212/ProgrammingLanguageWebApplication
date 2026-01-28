import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogService from "../services/BlogService";

export default function BlogDetails() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await BlogService.getBlogById(blogId);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-gray-700">
        Loading blog details...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Blog not found!
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-8 md:p-12 relative">
      {/* Blog Header Image */}
      <div
        className="bg-cover h-64 text-center overflow-hidden rounded-lg shadow-md"
        style={{
            width: "100%",
          height: "450px",
          backgroundImage: `url(http://localhost:8080/blog-images/${blog.imageUrls})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Blog Content */}
      <div className="max-w-2xl mx-auto">
        <div className="mt-5 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal p-6 shadow-lg">
          <div>
            {/* Blog Title */}
            <h1 className="text-gray-900 font-bold text-3xl mb-3">
              {blog.blog_text}
            </h1>

            {/* Author + Date */}
            <p className="text-gray-600 text-sm mb-4">
              Written By:{" "}
              <span className="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                Admin
              </span>{" "}
              |{" "}
              <span className="text-gray-500">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </p>

            {/* Blog Description */}
            <p className="text-base leading-8 text-gray-700 my-5 whitespace-pre-line">
              {blog.blog_description}
            </p>

            {/* Tags (example static for now) */}
            <div className="mt-6 space-x-2">
              <a
                href="#"
                className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
              >
                #Programming
              </a>
              <a
                href="#"
                className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
              >
                #Java
              </a>
              <a
                href="#"
                className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
              >
                #Development
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
