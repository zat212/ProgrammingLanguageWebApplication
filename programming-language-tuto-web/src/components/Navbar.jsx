import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileService from '../services/ProfileService';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profile, setProfile] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // ✅ Detect system dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }

    // ✅ Fetch profile data
    const fetchProfile = async () => {
      try {
        const res = await ProfileService.getProfile();
        setProfile(res.data);
        console.log("Fetched profile data:", res.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded md:p-0 ${isActive
      ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
      : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <NavLink to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img
            src={Logo}
            className="h-8 bg-white rounded-lg"
            alt="My Logo"
          /> */}
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            Kai Zen
          </span>
        </NavLink>

        {/* Profile & Hamburger */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Profile Avatar */}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={`http://localhost:8080/uploads/profiles/${profile.profileImageUrl}`}
              alt="user"
            />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="z-50 mx-10 my-4 text-base list-none absolute right-4 top-16 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{profile.firstName} {profile.lastName}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {profile.email}
                </span>
              </div>
              <ul className="py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={showMobileMenu}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${showMobileMenu ? '' : 'hidden'
            }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="/home" className={navLinkClass} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className={navLinkClass}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/learningTimeLine" className={navLinkClass}>
                Road Map
              </NavLink>
            </li>
            <li>
              <NavLink to="/faqs" className={navLinkClass}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
