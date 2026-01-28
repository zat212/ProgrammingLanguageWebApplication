import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaFolderOpen,
  FaBars,
  FaSignOutAlt,
  FaSignInAlt,
  FaSpinner,
  FaBook,
  FaUserGraduate,
  FaQuestionCircle,
  FaFileAlt,
} from 'react-icons/fa';

const AdminSidebar = ({
  admin,
  loading,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate(); // ✅ hook in correct place

  const data = [
    {
      title: 'Lesson Management',
      icon: <FaBook />,
      links: [
        { name: 'View All Lessons', to: '/admin/lessonManagement' },
        { name: 'Add New Lesson', to: '/admin/createNewLesson' },
      ],
    },
    {
      title: 'Student Management',
      icon: <FaUserGraduate />,
      links: [
        { name: 'View Students', to: '/admin/studentManagement' },
        { name: 'Student Leaderboard', to: '/admin/checkLeaderboard' },
      ],
    },
    {
      title: 'Quiz Management',
      icon: <FaQuestionCircle />,
      links: [{ name: 'Quizzes Attempt', to: '/admin/checkQuizAttempt' }],
    },
    {
      title: 'Blog Management',
      icon: <FaFileAlt />,
      links: [
        { name: 'Create Blog', to: '/admin/createBlog' },
        { name: 'Blog List', to: '/admin/blogList' },
      ],
    },
  ];

  // ✅ final working signout function
  const handleSignOut = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/"); // redirect
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-30 inline-flex items-center p-2 
        sm:hidden text-gray-500 rounded-lg hover:bg-gray-100"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 w-64 h-screen bg-gray-50 dark:bg-gray-800
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:translate-x-0 sm:static
        `}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <a href="/" className="flex items-center pl-2.5 mb-5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-7"
              alt="Logo"
            />
            <span className="text-xl font-semibold dark:text-white">
              Admin Panel
            </span>
          </a>

          <nav className="font-medium">
            {data.map((section, idx) => (
              <div
                key={section.title}
                className={`px-2 py-4 ${
                  idx !== 0 ? 'border-t border-gray-300 dark:border-gray-700' : ''
                }`}
              >
                <h3 className="flex items-center text-gray-700 dark:text-gray-300 mb-4 
                  text-sm font-semibold uppercase tracking-wide"
                >
                  {React.cloneElement(section.icon, {
                    className: 'inline-block mr-3 text-lg',
                  })}
                  {section.title}
                </h3>

                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center p-2 text-gray-900 rounded-lg 
                          dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FaFolderOpen className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Sign Out */}
            <div className="px-2 py-4 border-t border-gray-300 dark:border-gray-700">
              {loading ? (
                <div className="flex items-center text-gray-500 dark:text-gray-400 p-2">
                  <FaSpinner className="animate-spin w-4 h-4 mr-3" />
                  <span>Loading...</span>
                </div>
              ) : admin ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full p-2 text-gray-900 
                  dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center p-2 text-gray-900 rounded-lg 
                    dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaSignInAlt className="w-4 h-4 mr-3" />
                  <span>Log In</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
