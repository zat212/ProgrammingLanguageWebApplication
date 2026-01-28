import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FiUsers,
    FiSettings,
    FiChevronDown,
    FiChevronUp,
    FiBarChart2,
    FiLogOut,
    FiChevronLeft,
    FiFileText,
} from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";

export default function MainAdminNavbar({ sidebarOpen, setSidebarOpen }) {
    const [openUsers, setOpenUsers] = useState(false);
    const [openLessons, setOpenLessons] = useState(false);
    const [openBlogs, setOpenBlogs] = useState(false);
    const location = useLocation(); // To detect current route

    const isActive = (path) => location.pathname === path;

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
        >
            {/* Sidebar Top */}
            <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
                <span className="text-white text-lg font-bold">Superadmin</span>

                {/* Sidebar Close Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white md:hidden"
                >
                    <FiChevronLeft size={22} />
                </button>
            </div>

            {/* NAV ITEMS */}
            <nav className="mt-5 overflow-y-auto h-[calc(100vh-4rem)]">
                {/* Users Menu */}
                <div>
                    <button
                        onClick={() => setOpenUsers(!openUsers)}
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-100 hover:bg-gray-700"
                    >
                        <span className="flex items-center">
                            <FiUsers className="mr-3 text-lg" /> Users
                        </span>
                        {openUsers ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {openUsers && (
                        <div className="bg-gray-700">
                            <Link
                                to="/mainAdmin/allusers"
                                className={`block w-full px-8 py-2 text-gray-200 hover:bg-gray-600 ${isActive("/admin/all-users") && "bg-gray-600"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                All Users
                            </Link>
                            <Link
                                to="/mainAdmin/students"
                                className={`block w-full px-8 py-2 text-gray-200 hover:bg-gray-600 ${isActive("/admin/add-user") && "bg-gray-600"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                Students
                            </Link>
                            <Link
                                to="/mainAdmin/tutors"
                                className={`block w-full px-8 py-2 text-gray-200 hover:bg-gray-600 ${isActive("/admin/user-roles") && "bg-gray-600"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                Tutors
                            </Link>
                        </div>
                    )}
                </div>

                {/* Lessons Menu */}
                <div>
                    <button
                        onClick={() => setOpenLessons(!openLessons)}
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-100 hover:bg-gray-700"
                    >
                        <span className="flex items-center">
                            <GiNotebook className="mr-3 text-lg" /> Lessons
                        </span>
                        {openLessons ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {openLessons && (
                        <div className="bg-gray-700">
                            <Link
                                to="/mainAdmin/allLessons"
                                className={`block w-full px-8 py-2 text-gray-200 hover:bg-gray-600 ${isActive("/admin/all-lessons") && "bg-gray-600"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                All Lessons
                            </Link>
                            
                        </div>
                    )}
                </div>

                {/* Blogs Menu */}
                <div>
                    <button
                        onClick={() => setOpenBlogs(!openBlogs)}
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-100 hover:bg-gray-700"
                    >
                        <span className="flex items-center">
                            <FiFileText className="mr-3 text-lg" /> Blogs
                        </span>
                        {openBlogs ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {openBlogs && (
                        <div className="bg-gray-700">
                            <Link
                                to="/mainAdmin/allBlogs"
                                className={`block w-full px-8 py-2 text-gray-200 hover:bg-gray-600 ${isActive("/admin/general") && "bg-gray-600"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                All Blogs
                            </Link>
                            <Link
                                to="/mainAdmin/addBlog"
                                className={`block w-full px-8 py-2 text-gray-200 hover:bg-gray-600 ${isActive("/admin/security") && "bg-gray-600"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                Add Blog
                            </Link>
                            
                        </div>
                    )}
                </div>

                {/* Analytics */}
                

                {/* Logout */}
                <Link
                    to="/adminLogin"
                    className={`flex items-center w-full px-8 py-2 text-gray-200 hover:bg-gray-600 ${isActive("/admin/logout") && "bg-gray-600"
                        }`}
                    onClick={() => setSidebarOpen(false)}
                >
                    <FiLogOut className="mr-3 text-lg" />
                    Logout
                </Link>
            </nav>
        </aside>
    );
}
