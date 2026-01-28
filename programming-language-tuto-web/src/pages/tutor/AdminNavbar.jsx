import React from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";

const AdminNavbar = ({ onToggleSidebar, adminName = "Admin", onSignOut }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
        {/* --- Left: Sidebar Toggle (Mobile) --- */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none sm:hidden"
          >
            <FaBars size={20} />
          </button>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Admin Panel
          </span>
        </div>

        {/* --- Right: Icons & Profile --- */}
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
            <FaBell size={18} />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>



        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
