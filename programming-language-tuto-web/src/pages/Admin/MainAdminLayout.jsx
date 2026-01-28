import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MainAdminNavbar from "./MainAdminNavbar";

export default function MainAdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <MainAdminNavbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:ml-64">

                {/* Top Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 fixed top-0 right-0 left-0 md:left-64 z-30">

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-500 md:hidden"
                    >
                        <i className="fas fa-bars text-2xl"></i>
                    </button>

                    {/* Right Section */}
                    
                </header>

                {/* Page Content */}
                <main className="p-6 mt-16 flex-1 overflow-y-auto">
                    {/* ROUTER WILL LOAD ADMIN PAGES HERE */}
                    <Outlet />
                </main>

            </div>
        </div>
    );
}
